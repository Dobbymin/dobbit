export interface WalletStatsEntity {
  id: string;
  user_id: string;
  total_assets: number;
  total_purchase: number;
  total_evaluation: number;
  total_profit_loss: number;
  total_profit_rate: number;
  held_krw: number;
  updated_at: string;
  created_at: string;
}
