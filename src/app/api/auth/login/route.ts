import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db";
import { verifyPassword, createSession, setAuthCookies } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "L'adresse e-mail et le mot de passe sont requis." }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
    }

    // Generate VIP enterprise tokens
    const { accessToken, refreshToken } = await createSession(user);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // Set secure HTTP-only cookies
    setAuthCookies(response, accessToken, refreshToken);

    return response;
  } catch (err) {
    console.error("Erreur connexion:", err);
    return NextResponse.json({ error: "Une erreur est survenue lors de la connexion." }, { status: 500 });
  }
}
