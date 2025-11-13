import { useQuery } from "@tanstack/react-query";

import { marketOrderAPI } from "../apis";

export const useGetMarketOrder = (markets: string) => {
  return useQuery({
    queryKey: ["market-order", markets],
    queryFn: () => marketOrderAPI(markets),
  });
};
