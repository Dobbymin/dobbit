import { createClient } from "@/shared/utils/supabase/client";

export interface WalletStats {
  total_assets: number;
  total_purchase: number;
  total_evaluation: number;
  total_profit_loss: number;
  total_profit_rate: number;
  held_krw: number;
}

/**
 * 사용자의 지갑 통계 정보를 조회합니다.
 */
export const getWalletStatsAPI = async (): Promise<WalletStats | null> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase.from("wallet_stats").select("*").eq("user_id", user.id).single();

  if (error) {
    // 레코드가 없으면 기본값 반환
    if (error.code === "PGRST116") {
      return {
        total_assets: 0,
        total_purchase: 0,
        total_evaluation: 0,
        total_profit_loss: 0,
        total_profit_rate: 0,
        held_krw: 0,
      };
    }
    throw error;
  }

  return {
    total_assets: data.total_assets ?? 0,
    total_purchase: data.total_purchase ?? 0,
    total_evaluation: data.total_evaluation ?? 0,
    total_profit_loss: data.total_profit_loss ?? 0,
    total_profit_rate: data.total_profit_rate ?? 0,
    held_krw: data.held_krw ?? 0,
  };
};

/**
 * 지갑 통계를 업데이트합니다. (프론트엔드에서 계산된 값)
 */
export const updateWalletStatsAPI = async (stats: Partial<WalletStats>): Promise<void> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("wallet_stats")
    .upsert({
      user_id: user.id,
      ...stats,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) throw error;
};
