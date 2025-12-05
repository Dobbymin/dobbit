import { useQuery } from "@tanstack/react-query";

import { candleAPI } from "../apis";
import type { CandleParams, MinutesCandleParams } from "../types";

export const useGetCandle = (params: CandleParams) => {
  const { market, count, type, to } = params;

  // 분 캔들일 때만 unit을 queryKey에 포함
  const unit = type === "minutes" ? (params as MinutesCandleParams).unit : undefined;

  const queryKey = unit ? ["candle", market, count, type, unit, to] : ["candle", market, count, type, to];

  return useQuery({
    queryKey,
    queryFn: () => candleAPI(params),

    refetchInterval: type === "seconds" ? 500 : type === "minutes" ? 5_000 : false,
  });
};
