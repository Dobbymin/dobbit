import { useQuery } from "@tanstack/react-query";

import { candleAPI } from "../apis";
import type { CandleParams, MinutesCandleParams } from "../types";

export const useGetCandle = (params: CandleParams) => {
  const { market, count, type } = params;

  // 분 캔들일 때만 unit을 queryKey에 포함
  const unit = type === "minutes" ? (params as MinutesCandleParams).unit : undefined;

  const queryKey = unit ? ["candle", market, count, type, unit] : ["candle", market, count, type];

  return useQuery({
    queryKey,
    queryFn: () => candleAPI(params),

    refetchInterval: 500,
  });
};
