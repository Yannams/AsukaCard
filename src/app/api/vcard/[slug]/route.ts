import { NextRequest, NextResponse } from "next/server";
import { getCardBySlug, recordCardAnalytics } from "@/lib/db";
import { generateVCard } from "@/lib/vcard";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const card = getCardBySlug(slug);

  if (!card) {
    return new NextResponse("Carte non trouvée", { status: 404 });
  }

  // Record vCard download analytics
  recordCardAnalytics(card.id, "vcard");

  const vCardData = generateVCard(card);
  const safeFilename = `${card.slug || "contact"}.vcf`;

  return new NextResponse(vCardData, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "Cache-Control": "no-cache",
    },
  });
}
