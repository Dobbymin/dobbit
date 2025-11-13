import { TradeEntity } from "../types";

export interface CoinOrderParams {
  coin_id: string;
  price: number;
  amount: number;
  trade_type: "buy" | "sell";
}

export interface TradeResponse {
  success: boolean;
  data?: TradeEntity;
  error?: string;
}

export const tradeAPI = async ({ coin_id, price, amount, trade_type }: CoinOrderParams): Promise<TradeResponse> => {
  const response = await fetch("/api/trade", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coin_id,
      price,
      amount,
      trade_type,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Trade failed");
  }

  return response.json();
};
