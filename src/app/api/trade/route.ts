import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { toDisplayMarket } from "@/entities";

import { createClient as createServerClient } from "@/shared/utils/supabase/server";

// coin_id 정규화: 항상 display 형식(BTC/KRW)으로 저장
const normalizeCoinId = (coinId: string): string => {
  // 이미 display 형식이면 그대로
  if (coinId.includes("/")) return coinId;
  // Upbit 형식이면 display로 변환
  if (coinId.includes("-")) return toDisplayMarket(coinId);
  return coinId;
};

export async function POST(request: Request) {
  try {
    const supabase = createServerClient(cookies());
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { coin_id: rawCoinId, price, amount, trade_type } = body;

    // coin_id를 정규화 (display 형식으로 통일)
    const coin_id = normalizeCoinId(rawCoinId);

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
    const userId = userData.user.id;

    // 매수/매도에 따른 지갑 잔고 확인 및 업데이트
    if (trade_type === "buy") {
      // 매수: KRW 차감, 코인 증액
      // 1. KRW 잔고 확인
      const { data: krwWallet } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", userId)
        .eq("coin_id", "KRW")
        .single();

      if (!krwWallet || krwWallet.amount < total_krw) {
        return NextResponse.json({ error: "KRW 잔고가 부족합니다." }, { status: 400 });
      }

      // 2. KRW 차감
      const { error: krwUpdateError } = await supabase
        .from("wallet")
        .update({ amount: krwWallet.amount - total_krw })
        .eq("id", krwWallet.id);

      if (krwUpdateError) {
        console.error("KRW update error:", krwUpdateError);
        return NextResponse.json({ error: krwUpdateError.message }, { status: 500 });
      }

      // 3. 코인 증액 (없으면 생성)
      const { data: coinWallet } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", userId)
        .eq("coin_id", coin_id)
        .single();

      if (coinWallet) {
        // 기존 코인 지갑 증액
        const { error: coinUpdateError } = await supabase
          .from("wallet")
          .update({ amount: coinWallet.amount + amount })
          .eq("id", coinWallet.id);

        if (coinUpdateError) {
          console.error("Coin update error:", coinUpdateError);
          return NextResponse.json({ error: coinUpdateError.message }, { status: 500 });
        }
      } else {
        // 새 코인 지갑 생성
        // coins 테이블에 코인이 없으면 생성
        const { error: coinSelectError } = await supabase
          .from("coins")
          .select("market_id")
          .eq("market_id", coin_id)
          .single();

        // PGRST116: 데이터가 없을 때 발생하는 에러 코드
        if (coinSelectError && coinSelectError.code === "PGRST116") {
          const { error: coinInsertError } = await supabase
            .from("coins")
            .insert({ market_id: coin_id, korean_name: coin_id, english_name: coin_id });
          if (coinInsertError) {
            console.error("Coin insert error:", coinInsertError);
            return NextResponse.json({ error: coinInsertError.message }, { status: 500 });
          }
        }

        const { error: walletInsertError } = await supabase.from("wallet").insert({ user_id: userId, coin_id, amount });

        if (walletInsertError) {
          console.error("Wallet insert error:", walletInsertError);
          return NextResponse.json({ error: walletInsertError.message }, { status: 500 });
        }
      }
    } else if (trade_type === "sell") {
      // 매도: 코인 차감, KRW 증액
      // 1. 코인 잔고 확인
      const { data: coinWallet } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", userId)
        .eq("coin_id", coin_id)
        .single();

      if (!coinWallet || coinWallet.amount < amount) {
        return NextResponse.json({ error: "코인 잔고가 부족합니다." }, { status: 400 });
      }

      // 2. 코인 차감
      const { error: coinUpdateError } = await supabase
        .from("wallet")
        .update({ amount: coinWallet.amount - amount })
        .eq("id", coinWallet.id);

      if (coinUpdateError) {
        console.error("Coin update error:", coinUpdateError);
        return NextResponse.json({ error: coinUpdateError.message }, { status: 500 });
      }

      // 3. KRW 증액
      const { data: krwWallet } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", userId)
        .eq("coin_id", "KRW")
        .single();

      if (krwWallet) {
        const { error: krwUpdateError } = await supabase
          .from("wallet")
          .update({ amount: krwWallet.amount + total_krw })
          .eq("id", krwWallet.id);

        if (krwUpdateError) {
          console.error("KRW update error:", krwUpdateError);
          return NextResponse.json({ error: krwUpdateError.message }, { status: 500 });
        }
      } else {
        // KRW 지갑이 없으면 생성 (일반적으로 있어야 하지만 예외 처리)
        const { error: krwInsertError } = await supabase
          .from("wallet")
          .insert({ user_id: userId, coin_id: "KRW", amount: total_krw });

        if (krwInsertError) {
          console.error("KRW insert error:", krwInsertError);
          return NextResponse.json({ error: krwInsertError.message }, { status: 500 });
        }
      }
    }

    // 거래 데이터 삽입
    const { data: tradeData, error: tradeError } = await supabase
      .from("trade")
      .insert({
        user_id: userId,
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
    const supabase = createServerClient(cookies());
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
