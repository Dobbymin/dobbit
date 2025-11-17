export interface MarketInfo {
  market: string;
  korean_name: string;
  english_name: string;
}

export interface MarketResponse {
  success: boolean;
  data: MarketInfo[];
}

export const getMarketsAPI = async (): Promise<MarketResponse> => {
  const response = await fetch("/api/market?type=list", {
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch markets");
  }

  return response.json();
};
