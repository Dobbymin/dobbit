import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createClient as createServerClient } from "@/shared/utils/supabase/server";

export async function PATCH(request: Request) {
  try {
    const supabase = createServerClient(cookies());
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return NextResponse.json({ status: "error", data: null, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { nickname } = body;

    // 닉네임 검증
    if (!nickname || typeof nickname !== "string") {
      return NextResponse.json({ status: "error", data: null, error: "닉네임을 입력해주세요." }, { status: 400 });
    }

    if (nickname.length < 2 || nickname.length > 20) {
      return NextResponse.json(
        { status: "error", data: null, error: "닉네임은 2자 이상 20자 이하로 입력해주세요." },
        { status: 400 },
      );
    }

    // 사용자 메타데이터 업데이트
    const { data, error } = await supabase.auth.updateUser({
      data: {
        nickname,
      },
    });

    if (error) {
      console.error("Nickname update error:", error);
      return NextResponse.json({ status: "error", data: null, error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { status: "success", data: { nickname: data.user.user_metadata.nickname } },
      { status: 200 },
    );
  } catch (error) {
    console.error("Nickname API error:", error);
    return NextResponse.json({ status: "error", data: null, error: "Internal server error" }, { status: 500 });
  }
}
