/**
 * FedaPay Payment Gateway Integration
 * Supports Sandbox and Live environments for Benin and West Africa
 * (MTN Mobile Money, Moov Money, Celtiis Cash, Wave, Visa, Mastercard)
 */

export interface FedaPayCustomer {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  country?: string;
}

export interface CreateTransactionParams {
  amount: number; // in XOF
  description: string;
  callbackUrl: string;
  customer: FedaPayCustomer;
  customMetadata?: Record<string, any>;
}

export interface FedaPayCheckoutResult {
  success: boolean;
  transactionId?: string | number;
  token?: string;
  checkoutUrl: string;
  isSimulated?: boolean;
  error?: string;
}

function getFedaPayConfig() {
  const secretKey = process.env.FEDAPAY_SECRET_KEY?.trim() || "";
  const publicKey = process.env.FEDAPAY_PUBLIC_KEY?.trim() || "";
  const explicitEnv = process.env.FEDAPAY_ENVIRONMENT?.toLowerCase()?.trim();

  // Determine environment: if key starts with sk_live, or explicitly set to live
  const isLive = explicitEnv === "live" || secretKey.startsWith("sk_live");
  const baseUrl = isLive
    ? "https://api.fedapay.com/v1"
    : "https://sandbox-api.fedapay.com/v1";

  return {
    secretKey,
    publicKey,
    isLive,
    baseUrl,
    hasKey: Boolean(secretKey),
  };
}

/**
 * Clean phone number for FedaPay (requires standard digits and country code)
 */
function formatFedaPayPhone(phone?: string, defaultCountry = "bj") {
  if (!phone) return { number: "00000000", country: defaultCountry };
  const digits = phone.replace(/[^0-9]/g, "");
  // If user entered +22997000000, keep national number if 8 or 10 digits
  let nationalNumber = digits;
  if (digits.startsWith("229") && digits.length >= 11) {
    nationalNumber = digits.slice(3);
  }
  return {
    number: nationalNumber.slice(-10) || "97000000",
    country: defaultCountry,
  };
}

/**
 * Create a transaction on FedaPay and generate checkout token / URL
 */
export async function createFedaPayTransaction(
  params: CreateTransactionParams
): Promise<FedaPayCheckoutResult> {
  const config = getFedaPayConfig();

  // If no secret key is configured, provide graceful development simulation mode
  if (!config.hasKey) {
    console.warn(
      "[FEDAPAY] FEDAPAY_SECRET_KEY non configurée dans .env. Mode simulation de paiement actif."
    );
    const mockTxId = `SIM_FEDA_${Date.now()}`;
    const simulationUrl = `${params.callbackUrl}${
      params.callbackUrl.includes("?") ? "&" : "?"
    }id=${mockTxId}&status=approved&simulated=true`;

    return {
      success: true,
      transactionId: mockTxId,
      token: "sim_token_dev_asuka",
      checkoutUrl: simulationUrl,
      isSimulated: true,
    };
  }

  try {
    const phoneInfo = formatFedaPayPhone(
      params.customer.phone,
      params.customer.country || "bj"
    );

    // 1. Create Transaction on FedaPay
    const createRes = await fetch(`${config.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: params.description,
        amount: Math.round(params.amount),
        currency: {
          iso: "XOF",
        },
        callback_url: params.callbackUrl,
        customer: {
          firstname: params.customer.firstname || "Client",
          lastname: params.customer.lastname || "Asuka",
          email: params.customer.email,
          phone_number: phoneInfo,
        },
        custom_metadata: params.customMetadata,
      }),
    });

    const createData = await createRes.json();
    if (!createRes.ok) {
      const errMsg =
        createData.message ||
        createData.errors?.[0] ||
        `FedaPay Error (${createRes.status})`;
      console.error("[FEDAPAY] Error creating transaction:", createData);
      return { success: false, checkoutUrl: "", error: String(errMsg) };
    }

    const transaction = createData["v1/transaction"] || createData.transaction || createData;
    const transactionId = transaction.id;

    if (!transactionId) {
      return {
        success: false,
        checkoutUrl: "",
        error: "Identifiant de transaction FedaPay introuvable",
      };
    }

    // 2. Generate Checkout Token and Payment URL
    const tokenRes = await fetch(`${config.baseUrl}/transactions/${transactionId}/token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
      },
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("[FEDAPAY] Error generating token:", tokenData);
      return {
        success: false,
        checkoutUrl: "",
        error: tokenData.message || "Échec génération lien de paiement FedaPay",
      };
    }

    const token = tokenData.token;
    const checkoutUrl = tokenData.url;

    return {
      success: true,
      transactionId,
      token,
      checkoutUrl,
      isSimulated: false,
    };
  } catch (err: any) {
    console.error("[FEDAPAY] Network or runtime exception:", err);
    return {
      success: false,
      checkoutUrl: "",
      error: err.message || "Impossible de contacter la passerelle FedaPay",
    };
  }
}

/**
 * Retrieve transaction details from FedaPay
 */
export async function getFedaPayTransaction(transactionId: string | number) {
  const config = getFedaPayConfig();

  if (String(transactionId).startsWith("SIM_FEDA_") || !config.hasKey) {
    return {
      id: transactionId,
      status: "approved",
      amount: 0,
      simulated: true,
    };
  }

  try {
    const res = await fetch(`${config.baseUrl}/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data["v1/transaction"] || data.transaction || data;
  } catch (err) {
    console.error("[FEDAPAY] Error fetching transaction:", err);
    return null;
  }
}
