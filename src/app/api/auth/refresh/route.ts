import { NextRequest, NextResponse } from "next/server";
import { verifyToken, signToken, ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
    
    if (!refreshToken) {
      return NextResponse.json({ error: "Aucun jeton de rafraîchissement trouvé." }, { status: 401 });
    }

    const decoded = verifyToken(refreshToken);
    if (!decoded || decoded.type !== "refresh") {
      return NextResponse.json({ error: "Jeton de rafraîchissement invalide ou expiré." }, { status: 401 });
    }

    // Verify token exists and is valid in database (Instant Revocation Check)
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken }
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Session révoquée ou expirée." }, { status: 401 });
    }

    // Issue a brand new 15-minute Access Token
    const payload = { userId: decoded.userId, email: decoded.email, name: decoded.name };
    const newAccessToken = signToken({ ...payload, type: "access" }, 15 * 60 * 1000);

    const response = NextResponse.json({ success: true });
    
    response.cookies.set(ACCESS_COOKIE, newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
