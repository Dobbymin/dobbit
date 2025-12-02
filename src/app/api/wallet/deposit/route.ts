import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { depositService } from "@/entities";
import { APIResponse } from "@/shared";

import { createClient as createServerClient } from "@/shared/utils/supabase/server";

export async function POST(request: Request) {
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

    const body = await request.json();
    const { amount } = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json<APIResponse<null>>(
        { status: "error", data: null, error: "Invalid amount" },
        { status: 400 },
      );
    }

    const result = await depositService({
      client: supabase,
      user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata,
      },
      amount,
    });

    return NextResponse.json<APIResponse<typeof result>>({ status: "success", data: result }, { status: 200 });
  } catch (error) {
    console.error("Deposit API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json<APIResponse<null>>({ status: "error", data: null, error: errorMessage }, { status: 500 });
  }
}
