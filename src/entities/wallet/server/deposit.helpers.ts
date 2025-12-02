import { Database } from "@/shared";
import { SupabaseClient } from "@supabase/supabase-js";

import { WalletUser } from "../types";

export const ensureKrwCoinExists = async (client: SupabaseClient<Database>) => {
  const COIN_ID = "KRW";

  const { error: selectError } = await client.from("coins").select("market_id").eq("market_id", COIN_ID).single();

  if (selectError?.code === "PGRST116") {
    const { error: insertError } = await client
      .from("coins")
      .insert({ market_id: COIN_ID, korean_name: "원화", english_name: "Korean Won" });

    if (insertError) throw new Error(`Failed to create KRW coin: ${insertError.message}`);
  }
};

export const ensureProfileExists = async (client: SupabaseClient<Database>, user: WalletUser) => {
  const { error: selectError } = await client.from("profiles").select("id").eq("id", user.id).single();

  if (selectError?.code === "PGRST116") {
    const { error: insertError } = await client.from("profiles").insert({
      id: user.id,
      email: user.email || "",
      nickname: user.user_metadata?.nickname || "User",
      user_name: user.user_metadata?.full_name || "User",
    });

    if (insertError) throw new Error(`Failed to sync user profile: ${insertError.message}`);
  }
};
