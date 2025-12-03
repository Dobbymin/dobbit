import { UPBIT_URL } from "@/shared";

import { CandleData } from "../types";

interface CandleInterface {
  market: string;
  to?: string;
  count: number;
}

export const candleAPI = async ({ market, to, count }: CandleInterface): Promise<CandleData[]> => {
  const params = new URLSearchParams({
    market: market,
    count: count.toString(),
  });

  if (to) {
    params.append("to", to);
  }

  const response = await fetch(`${UPBIT_URL}/candles/seconds?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Candle API error: ${response.status} ${response.statusText}`);
  }

  const data: CandleData[] = await response.json();
  return data;
};
