import { NextRequest, NextResponse } from "next/server";

import { marketOrderAPI } from "@/entities";
import { Json, createClient } from "@/shared";

export async function POST(request: NextRequest) {
  try {
    const { market } = await request.json();

    if (!market) {
      return NextResponse.json({ error: "Market is required" }, { status: 400 });
    }

    // Upbit API에서 데이터 가져오기
    const upbitData = await marketOrderAPI(market);
    const marketData = upbitData[0];

    if (!marketData) {
      return NextResponse.json({ error: "No data from Upbit API" }, { status: 404 });
    }

    // Supabase에 저장 (upsert)
    const supabase = createClient();
    const { data, error } = await supabase
      .from("market_orders")
      .upsert(
        {
          market: marketData.market,
          orderbook_units: marketData.orderbook_units as unknown as Json,
          timestamp: marketData.timestamp,
        },
        {
          onConflict: "market",
        },
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET 요청으로 특정 마켓 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const market = searchParams.get("market");

    if (!market) {
      return NextResponse.json({ error: "Market is required" }, { status: 400 });
    }

    const supabase = createClient();
    const { data, error } = await supabase.from("market_orders").select("*").eq("market", market).single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Market not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Get error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
