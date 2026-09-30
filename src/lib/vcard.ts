import { Card } from "./db";

export function generateVCard(card: Card): string {
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${card.lastName || ""};${card.firstName || ""};;;`,
    `FN:${`${card.firstName || ""} ${card.lastName || ""}`.trim()}`,
  ];

  if (card.company) {
    lines.push(`ORG:${card.company}`);
  }

  if (card.title) {
    lines.push(`TITLE:${card.title}`);
  }

  if (card.fieldVisibility.phone && card.phone) {
    lines.push(`TEL;TYPE=CELL,VOICE:${card.phone}`);
  }

  if (card.fieldVisibility.whatsapp && card.whatsapp && card.whatsapp !== card.phone) {
    lines.push(`TEL;TYPE=WORK,VOICE:${card.whatsapp}`);
  }

  if (card.fieldVisibility.email && card.email) {
    lines.push(`EMAIL;TYPE=PREF,INTERNET:${card.email}`);
  }

  if (card.fieldVisibility.website && card.website) {
    lines.push(`URL:${card.website}`);
  }

  if (card.fieldVisibility.address && card.address) {
    // Format address into ADR field
    const escapedAddr = card.address.replace(/[\n\r]+/g, " ");
    lines.push(`ADR;TYPE=WORK:;;${escapedAddr};;;;`);
  }

  if (card.fieldVisibility.bio && card.bio) {
    const escapedNote = card.bio.replace(/[\n\r]+/g, "\\n");
    lines.push(`NOTE:${escapedNote}`);
  }

  // Social links in X-PROPERTIES
  if (card.fieldVisibility.socials && card.socials) {
    if (card.socials.linkedin) lines.push(`X-SOCIALPROFILE;type=linkedin:${card.socials.linkedin}`);
    if (card.socials.instagram) lines.push(`X-SOCIALPROFILE;type=instagram:${card.socials.instagram}`);
    if (card.socials.x) lines.push(`X-SOCIALPROFILE;type=twitter:${card.socials.x}`);
    if (card.socials.facebook) lines.push(`X-SOCIALPROFILE;type=facebook:${card.socials.facebook}`);
    if (card.socials.tiktok) lines.push(`X-SOCIALPROFILE;type=tiktok:${card.socials.tiktok}`);
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}
