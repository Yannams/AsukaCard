import { Card } from "./db";

// Helper to escape special characters in vCard text fields according to RFC 2426
function escapeVCard(value: string | undefined | null): string {
  if (!value) return "";
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\n|\r/g, "\\n");
}

export function generateVCard(card: Card): string {
  const firstName = card.firstName || "";
  const lastName = card.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Contact";
  const visibility = (card.fieldVisibility as any) || {
    phone: true,
    whatsapp: true,
    email: true,
    website: true,
    address: true,
    bio: true,
    socials: true,
  };

  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "PRODID:-//Asuka Card//FR",
    `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
    `FN:${escapeVCard(fullName)}`,
  ];

  if (card.company) {
    lines.push(`ORG:${escapeVCard(card.company)}`);
  }

  if (card.title) {
    lines.push(`TITLE:${escapeVCard(card.title)}`);
  }

  if (visibility.phone && card.phone) {
    lines.push(`TEL;TYPE=CELL,VOICE;TYPE=pref:${card.phone.trim()}`);
  }

  if (visibility.whatsapp && card.whatsapp && card.whatsapp !== card.phone) {
    lines.push(`TEL;TYPE=WORK,VOICE:${card.whatsapp.trim()}`);
  }

  if (visibility.email && card.email) {
    lines.push(`EMAIL;TYPE=PREF,INTERNET:${card.email.trim()}`);
  }

  if (visibility.website && card.website) {
    const webUrl = card.website.startsWith("http") ? card.website : `https://${card.website}`;
    lines.push(`URL:${webUrl}`);
  }

  if (visibility.address && card.address) {
    const escapedAddr = escapeVCard(card.address.replace(/[\n\r]+/g, " ").trim());
    lines.push(`ADR;TYPE=WORK:;;${escapedAddr};;;;`);
  }

  if (visibility.bio && card.bio) {
    lines.push(`NOTE:${escapeVCard(card.bio.trim())}`);
  }

  // Social links compatible with Apple iOS (Contacts.app) and Android
  // Apple Contacts natively supports grouped properties (itemN.URL + itemN.X-ABLabel)
  if (visibility.socials && card.socials) {
    let itemIdx = 1;

    const addSocial = (label: string, url?: string, serviceType?: string) => {
      if (!url) return;
      const cleanUrl = url.trim();
      if (!cleanUrl) return;

      lines.push(`item${itemIdx}.URL:${cleanUrl}`);
      lines.push(`item${itemIdx}.X-ABLabel:${label}`);

      if (serviceType) {
        try {
          const urlObj = new URL(cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`);
          const parts = urlObj.pathname.split("/").filter(Boolean);
          const username = parts[parts.length - 1] || "";
          if (username) {
            lines.push(`X-SOCIALPROFILE;type=${serviceType};x-user=${username}:x-apple:${username}`);
          }
        } catch {
          // ignore parsing error
        }
      }

      itemIdx++;
    };

    if ((card.socials as any).linkedin) addSocial("LinkedIn", (card.socials as any).linkedin, "linkedin");
    if ((card.socials as any).instagram) addSocial("Instagram", (card.socials as any).instagram, "instagram");
    if ((card.socials as any).x) addSocial("X (Twitter)", (card.socials as any).x, "twitter");
    if ((card.socials as any).facebook) addSocial("Facebook", (card.socials as any).facebook, "facebook");
    if ((card.socials as any).tiktok) addSocial("TikTok", (card.socials as any).tiktok, "tiktok");
    if ((card.socials as any).youtube) addSocial("YouTube", (card.socials as any).youtube, "youtube");
    if ((card.socials as any).snapchat) addSocial("Snapchat", (card.socials as any).snapchat, "snapchat");
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}
