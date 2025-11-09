import { UPBIT_URL } from "@/shared";

export interface MarketAllItem {
  market: string;
  korean_name: string;
  english_name: string;
  market_warning: string;
}

export const marketAllAPI = async (): Promise<MarketAllItem[]> => {
  const response = await fetch(`${UPBIT_URL}/market/all?isDetails=true`, {
    next: { revalidate: 60 }, // 60초 캐시 (서버 컴포넌트 환경에서)
  });

  if (!response.ok) {
    console.error("Upbit API error", response.status, response.statusText);
    throw new Error("Failed to fetch market data");
  }

  const data: MarketAllItem[] = await response.json();
  return data;
};
