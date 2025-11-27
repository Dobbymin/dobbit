import { useQuery } from "@tanstack/react-query";

import { BTCInfoAPI } from "../apis";

export const useGetBTCInfo = () => {
  return useQuery({
    queryKey: ["BTC-info"],
    queryFn: BTCInfoAPI,

    refetchInterval: 1000, // 1 second
  });
};
