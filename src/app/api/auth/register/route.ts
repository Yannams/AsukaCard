import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/db";
import { hashPassword, createSession, setAuthCookies } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Le nom doit comporter au moins 2 caractères." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Veuillez fournir une adresse e-mail valide." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Le mot de passe doit comporter au moins 6 caractères." }, { status: 400 });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "Un compte existe déjà avec cette adresse e-mail." }, { status: 409 });
    }

    const passwordHash = hashPassword(password);
    const user = await createUser(name.trim(), email, passwordHash);

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
    console.error("Erreur inscription:", err);
    return NextResponse.json({ error: "Une erreur est survenue lors de l'inscription." }, { status: 500 });
  }
}
