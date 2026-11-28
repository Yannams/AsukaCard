import React from "react";
import CardPreview from "@/components/CardPreview";
import { getCardBySlug } from "@/lib/db";
import type { Card, CardTemplate, DominantColor } from "@/lib/db";
import { buildMockPreviewCard, isDarkTemplate } from "@/lib/template-presets";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

function pickParam(sp: SearchParams, key: string): string | undefined {
  const raw = sp[key];
  if (Array.isArray(raw)) return raw[0];
  return typeof raw === "string" && raw.trim().length > 0 ? raw : undefined;
}

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const slug = pickParam(sp, "slug");
  const requestedTemplate = pickParam(sp, "template") as CardTemplate | undefined;
  const requestedColor = pickParam(sp, "color");

  const existingCard = slug ? await getCardBySlug(slug) : null;

  const draftFields: Partial<Card> = {};
  const textKeys = [
    "firstName",
    "lastName",
    "title",
    "company",
    "phone",
    "whatsapp",
    "email",
    "website",
    "address",
    "bio",
    "avatarUrl",
    "logoUrl",
  ] as const;

  for (const key of textKeys) {
    const val = pickParam(sp, key);
    if (val !== undefined) {
      draftFields[key] = val;
    }
  }

  const mergedInput: Partial<Card> = {
    ...(existingCard || {}),
    ...draftFields,
    ...(slug ? { slug } : {}),
  };

  const effectiveTemplate = (requestedTemplate || mergedInput.template || "premium") as CardTemplate;
  const previewCard = buildMockPreviewCard(mergedInput, effectiveTemplate);

  const validColor: DominantColor =
    requestedColor === "orange" || requestedColor === "white" || requestedColor === "black"
      ? requestedColor
      : previewCard.dominantColor === "orange" || previewCard.dominantColor === "white"
        ? previewCard.dominantColor
        : "black";

  previewCard.dominantColor = validColor;
  previewCard.template = effectiveTemplate;

  const dark = isDarkTemplate(effectiveTemplate);
  const bgClass = dark ? "bg-black" : "bg-white";

  return (
    <main className={`min-h-screen w-full ${bgClass} flex justify-center`}>
      <div className="w-full max-w-md pt-9 pb-14">
        <CardPreview card={previewCard} interactive={false} isMobileFrame={true} />
      </div>
    </main>
  );
}
