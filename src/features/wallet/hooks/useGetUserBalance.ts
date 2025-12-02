import { userBalanceAPI } from "@/entities";
import { useQuery } from "@tanstack/react-query";

import { WALLET_KEYS } from "../constants";

export const useGetUserBalance = (coinId?: string) => {
  let queryKey: readonly unknown[];

  if (coinId === "KRW") {
    queryKey = WALLET_KEYS.balance.krw();
  } else if (coinId) {
    queryKey = WALLET_KEYS.balance.coin(coinId);
  } else {
    queryKey = WALLET_KEYS.balance.all;
  }

  return useQuery({
    queryKey: queryKey,

    queryFn: () => userBalanceAPI(coinId),

    refetchInterval: 1000,

    retry: 1,
  });
};
