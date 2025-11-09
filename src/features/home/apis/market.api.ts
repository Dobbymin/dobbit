import { MarketInfoType } from "@/entities";
import { APIResponse } from "@/shared";

// type MarketApiResponse = {
//   success: boolean;
//   data: MarketInfoType[];
//   error?: string;
// };

export const marketAPI = async (): Promise<MarketInfoType[]> => {
  const response = await fetch("/api/market", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Market API failed: ${response.status} ${response.statusText}`);
  }
  const json: APIResponse<MarketInfoType[]> = await response.json();

  return json.data;
};
