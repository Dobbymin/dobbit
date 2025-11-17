import { useQuery } from "@tanstack/react-query";

import { holdDepositAPI } from "../apis";

export const useGetHoldDeposit = () => {
  return useQuery({
    queryKey: ["hold-deposit"],
    queryFn: holdDepositAPI,

    refetchInterval: 15000,
  });
};
