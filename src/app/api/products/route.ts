import { NextResponse } from "next/server";
import { CARD_PRODUCTS } from "@/lib/db";

export async function GET() {
  return NextResponse.json({
    products: CARD_PRODUCTS,
  });
}
