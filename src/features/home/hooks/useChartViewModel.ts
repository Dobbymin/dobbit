import { useGetCandle, useGetMarket } from "@/entities";

import { useCandleParams } from "../store";
import { formattedMarketName } from "../utils";

import { useChartData } from "./useChartData";

export const useCoinChartViewModel = (count: number = 50) => {
  const { market } = useGetMarket();

  const currentMarket = formattedMarketName(market);

  // 현재 선택된 타임프레임에 따른 API 파라미터 자동 생성
  const candleParams = useCandleParams(currentMarket, count);

  const { data: candleData, isLoading, isError } = useGetCandle(candleParams);

  const { prices, volume } = useChartData(candleData);

  return {
    prices,
    volume,
    isLoading,
    isError,
    currentMarket: market,
  };
};
