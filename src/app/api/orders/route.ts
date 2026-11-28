import { NextResponse } from "next/server";
import { getCurrentUser, notifyBackofficeRealtime } from "@/lib/auth";
import { createOrder, getOrdersByUserId, updateOrderPayment } from "@/lib/db";
import { CARD_PRODUCTS, CARD_COLORS } from "@/lib/products";
import { createFedaPayTransaction } from "@/lib/fedapay";
import { z } from "zod";

const createOrderSchema = z.object({
  cardId: z.string().optional().nullable(),
  cardType: z.string(),
  cardColor: z.string().optional().default("Noir Mat"),
  customName: z.string().optional().nullable(),
  quantity: z.number().int().min(1).default(1),
  customerName: z.string().min(2, "Nom complet requis"),
  customerEmail: z.string().email("Email invalide"),
  customerPhone: z.string().min(6, "Numéro de téléphone requis"),
  shippingAddress: z.string().optional().default("Retrait direct au Showroom Asuka Spirit (Cotonou)"),
  city: z.string().optional().default("Cotonou"),
  country: z.string().optional().default("Bénin"),
  postalCode: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  paymentMethod: z
    .enum(["FEDAPAY", "MOBILE_MONEY", "CARD", "CASH_ON_DELIVERY", "BANK_TRANSFER"])
    .default("FEDAPAY"),
  autoConfirmPayment: z.boolean().optional().default(false),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const orders = await getOrdersByUserId(user.userId);
    return NextResponse.json({ orders });
  } catch (err: any) {
    console.error("Erreur récupération commandes:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createOrderSchema.parse(body);

    let user = await getCurrentUser();
    if (!user) {
      const { default: prisma } = await import("@/lib/prisma");
      const { hashPassword } = await import("@/lib/auth");
      const email = validated.customerEmail.toLowerCase().trim();

      let dbUser = await prisma.user.findUnique({ where: { email } });
      if (!dbUser) {
        const generatedPass = Math.random().toString(36).slice(-8) + Date.now().toString(36);
        const passwordHash = hashPassword(generatedPass);
        dbUser = await prisma.user.create({
          data: {
            name: validated.customerName,
            email,
            passwordHash,
            role: "USER",
          },
        });
      }

      user = {
        userId: dbUser.id,
        email: dbUser.email,
        name: dbUser.name || validated.customerName,
        role: dbUser.role,
      };
    }

    const product = CARD_PRODUCTS.find((p) => p.id === validated.cardType);
    if (!product) {
      return NextResponse.json({ error: "Modèle de carte invalide" }, { status: 400 });
    }

    const foundColor = CARD_COLORS.find(
      (c) => c.id === validated.cardColor || c.shortName === validated.cardColor || c.name === validated.cardColor
    );
    const resolvedColor = foundColor ? foundColor.name : validated.cardColor || "Noir Mat Obsidienne";

    const unitPrice = product.priceXOF;
    const totalAmount = unitPrice * validated.quantity;

    // Only allow simulated instant pay in non-production without a live key
    const isLiveFedaPay = (process.env.FEDAPAY_SECRET_KEY || "").trim().startsWith("sk_live");
    const isInstantSimulation =
      Boolean(validated.autoConfirmPayment) && process.env.NODE_ENV !== "production" && !isLiveFedaPay;
    const paymentStatus = isInstantSimulation ? "PAID" : "UNPAID";
    const paymentRef = isInstantSimulation ? `TX-${Date.now().toString(36).toUpperCase()}` : null;
    const paidAt = isInstantSimulation ? new Date() : null;

    const { default: prisma } = await import("@/lib/prisma");
    let order: any = null;
    let isReusedPendingOrder = false;

    // Reuse existing unpaid PENDING order for the same cardId instead of creating duplicates
    if (validated.cardId) {
      const existingPendingOrders = await prisma.order.findMany({
        where: {
          cardId: validated.cardId,
          paymentStatus: { not: "PAID" },
          status: "PENDING",
        },
        orderBy: { createdAt: "desc" },
      });

      if (existingPendingOrders.length > 0) {
        const primaryPending = existingPendingOrders[0];
        const staleDuplicates = existingPendingOrders.slice(1).map((o) => o.id);
        if (staleDuplicates.length > 0) {
          await prisma.order.updateMany({
            where: { id: { in: staleDuplicates } },
            data: { status: "CANCELLED", fedapayStatus: "superseded" },
          });
        }

        order = await prisma.order.update({
          where: { id: primaryPending.id },
          data: {
            cardType: validated.cardType,
            cardColor: resolvedColor,
            customName: validated.customName || validated.customerName,
            quantity: validated.quantity,
            unitPrice,
            totalAmount,
            customerName: validated.customerName,
            customerEmail: validated.customerEmail,
            customerPhone: validated.customerPhone,
            shippingAddress: validated.shippingAddress,
            city: validated.city,
            country: validated.country,
            postalCode: validated.postalCode,
            notes: validated.notes,
            paymentMethod: validated.paymentMethod,
            paymentStatus,
            paymentRef,
            paidAt,
            status: isInstantSimulation ? "CONFIRMED" : "PENDING",
          },
          include: {
            user: { select: { id: true, name: true, email: true } },
            card: { select: { id: true, slug: true, firstName: true, lastName: true, company: true, template: true } },
          },
        });
        isReusedPendingOrder = true;
      }
    }

    if (!order) {
      order = await createOrder({
        userId: user.userId,
        cardId: validated.cardId,
        cardType: validated.cardType,
        cardColor: resolvedColor,
        customName: validated.customName || validated.customerName,
        quantity: validated.quantity,
        unitPrice,
        totalAmount,
        currency: "XOF",
        customerName: validated.customerName,
        customerEmail: validated.customerEmail,
        customerPhone: validated.customerPhone,
        shippingAddress: validated.shippingAddress,
        city: validated.city,
        country: validated.country,
        postalCode: validated.postalCode,
        notes: validated.notes,
        paymentMethod: validated.paymentMethod,
        paymentStatus,
        paymentRef,
        paidAt,
      });
    }

    let checkoutUrl: string | null = null;
    let isSimulatedPayment = false;

    if (
      !isInstantSimulation &&
      (validated.paymentMethod === "FEDAPAY" ||
        validated.paymentMethod === "MOBILE_MONEY" ||
        validated.paymentMethod === "CARD")
    ) {
      const origin = req.headers.get("origin") || req.headers.get("referer") || "http://localhost:3000";
      const baseUrl = origin.split("?")[0].replace(/\/$/, "");
      const callbackUrl = `${baseUrl}/api/fedapay/callback?orderId=${order.id}`;

      const nameParts = validated.customerName.trim().split(" ");
      const firstname = nameParts[0] || "Client";
      const lastname = nameParts.slice(1).join(" ") || "Asuka";

      const fedapayRes = await createFedaPayTransaction({
        amount: totalAmount,
        description: `Commande Asuka Card ${order.orderNumber} - ${product.name} (${resolvedColor})`,
        callbackUrl,
        customer: {
          firstname,
          lastname,
          email: validated.customerEmail,
          phone: validated.customerPhone,
          country: validated.country?.toLowerCase() === "bénin" ? "bj" : "bj",
        },
        customMetadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          cardType: product.id,
          cardColor: resolvedColor,
        },
      });

      if (fedapayRes.success && fedapayRes.checkoutUrl) {
        checkoutUrl = fedapayRes.checkoutUrl;
        isSimulatedPayment = Boolean(fedapayRes.isSimulated);

        await updateOrderPayment(order.id, {
          paymentStatus: "UNPAID",
          fedapayId: fedapayRes.transactionId ? String(fedapayRes.transactionId) : undefined,
          fedapayUrl: fedapayRes.checkoutUrl,
          fedapayStatus: "pending",
        });
      } else {
        console.error("[ORDERS] Échec initialisation FedaPay:", fedapayRes.error);
      }
    }

    if (!isReusedPendingOrder) {
      notifyBackofficeRealtime({
        type: "CARD_ORDER_CREATED",
        title: `Nouvelle commande Asuka Card (${order.orderNumber})`,
        message: `${validated.customerName} — ${product.name} (${resolvedColor}) • ${totalAmount.toLocaleString("fr-FR")} FCFA`,
        orderId: `AC-${order.id}`,
        orderNumber: order.orderNumber,
        amount: totalAmount,
        customerName: validated.customerName,
      });
    }

    return NextResponse.json(
      {
        order,
        checkoutUrl,
        isSimulatedPayment,
        success: true,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Erreur création commande:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message || "Données invalides" }, { status: 400 });
    }
    return NextResponse.json({ error: "Impossible de créer la commande" }, { status: 500 });
  }
}
