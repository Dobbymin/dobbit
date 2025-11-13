import { NextResponse } from "next/server";

import { createClient } from "@/shared";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { coin_id, price, amount, trade_type } = body;

    // 필수 파라미터 검증
    if (!coin_id || !price || !amount || !trade_type) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // trade_type 검증 (buy 또는 sell)
    if (trade_type !== "buy" && trade_type !== "sell") {
      return NextResponse.json({ error: "Invalid trade_type. Must be 'buy' or 'sell'" }, { status: 400 });
    }

    // 총 거래 금액 계산
    const total_krw = price * amount;

    // 거래 데이터 삽입
    const { data: tradeData, error: tradeError } = await supabase
      .from("trade")
      .insert({
        user_id: userData.user.id,
        coin_id,
        price,
        amount,
        total_krw,
        trade_type,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (tradeError) {
      console.error("Trade insert error:", tradeError);
      return NextResponse.json({ error: tradeError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: tradeData }, { status: 200 });
  } catch (error) {
    console.error("Trade API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 사용자의 거래 내역 조회
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const coin_id = searchParams.get("coin_id");
    const trade_type = searchParams.get("trade_type");

    let query = supabase
      .from("trade")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    // 선택적 필터링
    if (coin_id) {
      query = query.eq("coin_id", coin_id);
    }
    if (trade_type) {
      query = query.eq("trade_type", trade_type);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Trade query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Trade GET API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
