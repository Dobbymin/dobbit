import { WalletEntity } from "@/entities/wallet";

export interface WalletResponse {
  success: boolean;
  data: WalletEntity[];
}

export const getWalletAPI = async (coinId?: string): Promise<WalletResponse> => {
  const url = coinId ? `/api/wallet/deposit?coin_id=${coinId}` : "/api/wallet/deposit";

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch wallet");
  }

  return response.json();
};
