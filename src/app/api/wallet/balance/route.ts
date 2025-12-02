import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getUserBalanceService } from "@/entities";
import { APIResponse } from "@/shared";

import { createClient as createServerClient } from "@/shared/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = createServerClient(cookies());

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json<APIResponse<null>>(
        { status: "error", data: null, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const coin_id = searchParams.get("coin_id");

    const walletData = await getUserBalanceService({
      client: supabase,
      userId: user.id,
      coinId: coin_id,
    });

    return NextResponse.json<APIResponse<typeof walletData>>({ status: "success", data: walletData }, { status: 200 });
  } catch (error) {
    console.error("Wallet GET API error:", error);

    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json<APIResponse<null>>({ status: "error", data: null, error: errorMessage }, { status: 500 });
  }
}
