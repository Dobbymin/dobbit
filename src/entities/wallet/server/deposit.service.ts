import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/shared/types/database.type";

import { WalletUser } from "../types";

import { ensureKrwCoinExists, ensureProfileExists } from "./deposit.helpers";

type DepositParams = {
  client: SupabaseClient<Database>;
  user: WalletUser;
  amount: number;
};

export const depositService = async ({ client, user, amount }: DepositParams) => {
  const COIN_ID = "KRW";

  await Promise.all([ensureKrwCoinExists(client), ensureProfileExists(client, user)]);

  const { data: existingWallet, error: walletError } = await client
    .from("wallet")
    .select("*")
    .eq("user_id", user.id)
    .eq("coin_id", COIN_ID)
    .single();

  if (walletError && walletError.code !== "PGRST116") {
    throw new Error(walletError.message);
  }

  if (existingWallet) {
    const { data, error } = await client
      .from("wallet")
      .update({ amount: existingWallet.amount + amount })
      .eq("id", existingWallet.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  } else {
    const { data, error } = await client
      .from("wallet")
      .insert({ user_id: user.id, coin_id: COIN_ID, amount })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};
