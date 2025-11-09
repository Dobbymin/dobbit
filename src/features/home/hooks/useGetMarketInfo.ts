import { useQuery } from "@tanstack/react-query";

import { marketAPI } from "../apis";

export const useGetMarketInfo = () => {
  return useQuery({
    queryKey: ["market-info"],
    queryFn: marketAPI,
    refetchInterval: 10000, // 10초 폴링
  });
};
