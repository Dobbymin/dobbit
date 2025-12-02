import { Database } from "@/shared";
import { SupabaseClient } from "@supabase/supabase-js";

type WalletParams = {
  client: SupabaseClient<Database>;
  userId: string;
  coinId?: string | null;
};

export const getUserBalanceService = async ({ client, userId, coinId }: WalletParams) => {
  let query = client.from("wallet").select("*").eq("user_id", userId);

  if (coinId) {
    query = query.eq("coin_id", coinId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
