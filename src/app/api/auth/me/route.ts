import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export async function GET() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser) {
    return NextResponse.json({ user: null });
  }

  const user = await findUserById(sessionUser.userId);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
