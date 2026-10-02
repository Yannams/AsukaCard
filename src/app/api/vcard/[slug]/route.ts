import { NextRequest, NextResponse } from "next/server";
import { getCardBySlug, recordCardAnalytics } from "@/lib/db";
import { generateVCard } from "@/lib/vcard";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // Support both /api/vcard/john and /api/vcard/john.vcf
  const cleanSlug = decodeURIComponent(slug).replace(/\.vcf$/i, "").trim();
  const card = await getCardBySlug(cleanSlug);

  if (!card) {
    return new NextResponse("Carte non trouvée", { status: 404 });
  }

  // Record vCard download analytics
  

  const vCardData = generateVCard(card);

  // Generate safe filename for iOS and Android
  const fullName = `${card.firstName || ""} ${card.lastName || ""}`.trim() || card.slug || "contact";
  const safeAsciiName = fullName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();

  const filename = `${safeAsciiName || card.slug || "contact"}.vcf`;

  // Detect iOS user agent
  const userAgent = req.headers.get("user-agent") || "";
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

  // text/vcard is modern RFC 6350 standard, works seamlessly on iOS 14+ and Android
  const contentType = "text/vcard; charset=utf-8";

  return new NextResponse(vCardData, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
