import { NextRequest, NextResponse } from "next/server";

import { marketAllAPI, marketInfoHandler, toDisplayMarket } from "@/entities";

/**
 * 마켓 정보 조회 API
 * GET /api/market - 마켓 정보 + 시세 (기본)
 * GET /api/market?type=list - 마켓 목록만 조회 (KRW 마켓)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    // type=list인 경우 마켓 목록만 반환
    if (type === "list") {
      const markets = await marketAllAPI();
      const krwMarkets = markets
        .filter((market) => market.market.startsWith("KRW-"))
        .map((m) => ({ ...m, market: toDisplayMarket(m.market) }));
      return NextResponse.json({ success: true, data: krwMarkets }, { status: 200 });
    }

    // 기본: 마켓 정보 + 시세
    const data = await marketInfoHandler();
    return NextResponse.json({ status: "success", data });
  } catch (error) {
    console.error("Market API error:", error);
    return NextResponse.json({ status: "error", error: "Failed to fetch market data" }, { status: 500 });
  }
}
