/**
 * Universal formatter for social network profiles.
 * Transforms handles (e.g. "@richard", "richard", "instagram.com/richard")
 * into clean, valid, clickable destination URLs.
 */
export function formatSocialUrl(network: string, input?: string | null): string {
  if (!input) return "";
  let val = input.trim();
  if (!val) return "";

  // If already starts with mailto: or tel:
  if (val.startsWith("mailto:") || val.startsWith("tel:")) {
    return val;
  }

  // If already a full valid URL, clean trailing tracking queries if from standard platforms
  if (val.startsWith("http://") || val.startsWith("https://")) {
    try {
      const parsed = new URL(val);
      // Remove common tracking parameters (igsh, utm_*, etc.)
      parsed.searchParams.delete("igsh");
      parsed.searchParams.delete("utm_source");
      parsed.searchParams.delete("utm_medium");
      parsed.searchParams.delete("utm_campaign");
      parsed.searchParams.delete("fbclid");
      return parsed.toString();
    } catch {
      return val;
    }
  }

  // Strip leading '@' if present
  const cleanHandle = val.startsWith("@") ? val.slice(1).trim() : val;
  const net = network.toLowerCase().replace(/^social_/, "");

  switch (net) {
    case "instagram": {
      if (cleanHandle.includes("instagram.com/")) {
        return `https://${cleanHandle.replace(/^https?:\/\//, "")}`;
      }
      return `https://instagram.com/${cleanHandle}`;
    }

    case "tiktok": {
      if (cleanHandle.includes("tiktok.com/")) {
        return `https://${cleanHandle.replace(/^https?:\/\//, "")}`;
      }
      return `https://www.tiktok.com/@${cleanHandle}`;
    }

    case "youtube": {
      if (cleanHandle.includes("youtube.com/")) {
        return `https://${cleanHandle.replace(/^https?:\/\//, "")}`;
      }
      return `https://www.youtube.com/@${cleanHandle}`;
    }

    case "snapchat": {
      if (cleanHandle.includes("snapchat.com/")) {
        return `https://${cleanHandle.replace(/^https?:\/\//, "")}`;
      }
      return `https://www.snapchat.com/add/${cleanHandle}`;
    }

    case "facebook": {
      if (cleanHandle.includes("facebook.com/")) {
        return `https://${cleanHandle.replace(/^https?:\/\//, "")}`;
      }
      return `https://www.facebook.com/${cleanHandle}`;
    }

    case "linkedin": {
      if (cleanHandle.includes("linkedin.com/")) {
        return `https://${cleanHandle.replace(/^https?:\/\//, "")}`;
      }
      const slug = cleanHandle.replace(/^in\//, "");
      return `https://www.linkedin.com/in/${slug}`;
    }

    case "x":
    case "twitter": {
      if (cleanHandle.includes("x.com/") || cleanHandle.includes("twitter.com/")) {
        return `https://${cleanHandle.replace(/^https?:\/\//, "")}`;
      }
      return `https://x.com/${cleanHandle}`;
    }

    default: {
      return cleanHandle.startsWith("http") ? cleanHandle : `https://${cleanHandle}`;
    }
  }
}
