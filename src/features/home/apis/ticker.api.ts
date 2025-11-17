export interface TickerData {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number; // 현재가
  prev_closing_price: number;
  change: "RISE" | "EVEN" | "FALL";
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export interface TickerResponse {
  success: boolean;
  data: TickerData[];
}

export const getTickerAPI = async (markets: string = "KRW-WAXP"): Promise<TickerResponse> => {
  const response = await fetch(`/api/ticker?markets=${markets}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch ticker");
  }

  return response.json();
};
