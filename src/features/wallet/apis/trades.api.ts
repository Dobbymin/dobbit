import { TradeEntity } from "@/entities/market";

export interface TradesResponse {
  success: boolean;
  data: TradeEntity[];
  error?: string;
}

export const getTradesAPI = async (): Promise<TradesResponse> => {
  const res = await fetch("/api/trade", { cache: "no-store" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to fetch trades");
  }
  return res.json();
};
