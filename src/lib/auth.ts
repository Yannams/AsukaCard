import crypto from "crypto";
import { cookies } from "next/headers";
import prisma from "./prisma";

const SESSION_SECRET = process.env.SESSION_SECRET || "asuka_card_super_secure_secret_key_2026_modern_minimalist";

export const ACCESS_COOKIE = "asuka_access";
export const REFRESH_COOKIE = "asuka_refresh";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  type?: "access" | "refresh";
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

export function signToken(payload: TokenPayload, expiresInMs: number): string {
  const data = JSON.stringify({ ...payload, exp: Date.now() + expiresInMs });
  const base64Data = Buffer.from(data).toString("base64url");
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(base64Data).digest("base64url");
  return `${base64Data}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [base64Data, signature] = parts;
    const expectedSignature = crypto.createHmac("sha256", SESSION_SECRET).update(base64Data).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    const decoded = JSON.parse(Buffer.from(base64Data, "base64url").toString("utf-8"));
    if (decoded.exp && decoded.exp < Date.now()) {
      return null;
    }
    return {
      userId: decoded.userId,
      email: decoded.email,
      name: decoded.name,
      type: decoded.type,
    };
  } catch {
    return null;
  }
}

export async function createSession(user: { id: string; email: string; name: string | null }) {
  const payload = { userId: user.id, email: user.email, name: user.name || "" };
  
  // Access Token (15 mins)
  const accessToken = signToken({ ...payload, type: "access" }, 15 * 60 * 1000);
  
  // Refresh Token (7 days)
  const refreshToken = signToken({ ...payload, type: "refresh" }, 7 * 24 * 60 * 60 * 1000);
  
  // Store refresh token in DB for instant revocation ability
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return { accessToken, refreshToken };
}

export function setAuthCookies(res: any, accessToken: string, refreshToken: string) {
  const isProd = process.env.NODE_ENV === "production";
  
  res.cookies.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 15 * 60
  });
  
  res.cookies.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true, secure: isProd, sameSite: "lax", path: "/", maxAge: 7 * 24 * 60 * 60
  });
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const accessCookie = cookieStore.get(ACCESS_COOKIE);
  
  if (accessCookie && accessCookie.value) {
    const decoded = verifyToken(accessCookie.value);
    if (decoded && decoded.type === "access") return decoded;
  }
  
  // If no valid access token, client must call /api/auth/refresh to rotate
  return null;
}
