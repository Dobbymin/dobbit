import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const markets = searchParams.get("markets") || "KRW-WAXP";

    // Upbit API로 현재가 조회
    const response = await fetch(`https://api.upbit.com/v1/ticker?markets=${markets}`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch ticker from Upbit");
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Ticker API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
