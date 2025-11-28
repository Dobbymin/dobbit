import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createClient as createServerClient } from "@/shared/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = createServerClient(cookies());
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { amount } = body;

    // 필수 파라미터 검증
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const coin_id = "KRW"; // KRW 입금 - coins.market_id를 참조

    // FK 제약사항 대응: coins 테이블에 KRW가 없으면 생성
    const { error: coinSelectError } = await supabase
      .from("coins")
      .select("market_id")
      .eq("market_id", coin_id)
      .single();

    if (coinSelectError) {
      // 데이터 없음(PGRST116)이면 KRW를 생성 시도
      if ((coinSelectError as { code?: string }).code === "PGRST116") {
        const { error: coinInsertError } = await supabase
          .from("coins")
          .insert({ market_id: coin_id, korean_name: "원화", english_name: "Korean Won" });
        if (coinInsertError) {
          console.error("KRW coin insert error:", coinInsertError);
          return NextResponse.json({ error: coinInsertError.message }, { status: 500 });
        }
      } else {
        console.error("KRW coin select error:", coinSelectError);
        return NextResponse.json({ error: coinSelectError.message }, { status: 500 });
      }
    }

    // FK 제약사항 대응: users 테이블에 사용자가 없으면 생성 (Supabase Auth에는 있지만 public.users 테이블에 없을 경우)
    const { error: userSelectError } = await supabase.from("profiles").select("id").eq("id", userData.user.id).single();

    if (userSelectError) {
      if ((userSelectError as { code?: string }).code === "PGRST116") {
        // users 테이블에 사용자 정보가 없으면 생성
        const { error: userInsertError } = await supabase.from("profiles").insert({
          id: userData.user.id,
          email: userData.user.email || "",
          nickname: userData.user.user_metadata?.nickname || "User",
          user_name: userData.user.user_metadata?.full_name || "User", // profiles 테이블의 user_name 필드 추가
        });
        if (userInsertError) {
          console.error("User insert error:", userInsertError);
          return NextResponse.json({ error: `Failed to sync user: ${userInsertError.message}` }, { status: 500 });
        }
      } else {
        console.error("User check error:", userSelectError);
        return NextResponse.json({ error: userSelectError.message }, { status: 500 });
      }
    }

    // 기존 KRW 지갑 조회
    const { data: existingWallet, error: walletError } = await supabase
      .from("wallet")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("coin_id", coin_id)
      .single();

    if (walletError && walletError.code !== "PGRST116") {
      // PGRST116은 데이터 없음 오류
      console.error("Wallet query error:", walletError);
      return NextResponse.json({ error: walletError.message }, { status: 500 });
    }

    let result;

    if (existingWallet) {
      // 기존 지갑이 있으면 금액 증가
      const newAmount = existingWallet.amount + amount;
      const { data, error } = await supabase
        .from("wallet")
        .update({ amount: newAmount })
        .eq("id", existingWallet.id)
        .select()
        .single();

      if (error) {
        console.error("Wallet update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    } else {
      // 새 지갑 생성
      const { data, error } = await supabase
        .from("wallet")
        .insert({
          user_id: userData.user.id,
          coin_id,
          amount,
        })
        .select()
        .single();

      if (error) {
        console.error("Wallet insert error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    }

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error("Deposit API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// 사용자의 지갑 조회
export async function GET(request: Request) {
  try {
    const supabase = createServerClient(cookies());
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const coin_id = searchParams.get("coin_id");

    let query = supabase.from("wallet").select("*").eq("user_id", userData.user.id);

    if (coin_id) {
      query = query.eq("coin_id", coin_id);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Wallet query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Wallet GET API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
