import { UPBIT_URL } from "@/shared";

import { OrderbookUnit } from "../types";

export interface MarketOrderResponse {
  market: string;
  orderbook_units: OrderbookUnit[];
  timestamp: number;
}

export const marketOrderAPI = async (markets: string): Promise<MarketOrderResponse[]> => {
  const response = await fetch(`${UPBIT_URL}/orderbook?markets=${markets}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Upbit API error", response.status, response.statusText);
    throw new Error("Failed to fetch market order data");
  }

  const data = await response.json();
  return data;
};
