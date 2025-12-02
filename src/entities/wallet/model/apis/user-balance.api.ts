import { APIResponse } from "@/shared";

interface UserBalanceResponse {
  id: number;
  user_id: string;
  coin_id: string;
  amount: number;
}

export const userBalanceAPI = async (coinId?: string) => {
  const queryParams = coinId ? `?coin_id=${coinId}` : "";

  const response = await fetch(`/api/wallet/balance${queryParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user balance");
  }

  const result: APIResponse<UserBalanceResponse[]> = await response.json();

  if (result.status === "error") {
    throw new Error(result.error);
  }

  return result.data;
};
