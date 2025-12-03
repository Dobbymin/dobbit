import { useQuery } from "@tanstack/react-query";

import { candleAPI } from "../apis";

type CandleAPIParams = {
  market: string;
  to?: string;
  count: number;
};

export const useGetCandle = ({ market, to, count }: CandleAPIParams) => {
  return useQuery({
    queryKey: ["candle", market, to, count],
    queryFn: () => candleAPI({ market, to, count }),

    refetchInterval: 500,
  });
};
