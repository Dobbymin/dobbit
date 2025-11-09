import { NextResponse } from "next/server";

import { marketInfoHandler } from "@/entities";

export async function GET() {
  try {
    const data = await marketInfoHandler();
    return NextResponse.json({ status: "success", data });
  } catch (error) {
    console.error("Market API error:", error);
    return NextResponse.json({ status: "error", error: "Failed to fetch market data" }, { status: 500 });
  }
}
