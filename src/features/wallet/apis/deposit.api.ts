import { WalletEntity } from "../types";

export interface DepositParams {
  amount: number;
}

export interface DepositResponse {
  success: boolean;
  data?: WalletEntity;
  error?: string;
}

export const depositAPI = async (amount: number): Promise<DepositResponse> => {
  const response = await fetch("/api/wallet/deposit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Deposit failed");
  }

  return response.json();
};
