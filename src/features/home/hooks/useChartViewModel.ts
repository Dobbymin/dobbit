import { useGetCandle, useGetMarket } from "@/entities";

import { formattedMarketName } from "../utils";

import { useChartData } from "./useChartData";

export const useCoinChartViewModel = (count: number = 50) => {
  const { market } = useGetMarket();

  const currentMarket = formattedMarketName(market);

  const {
    data: candleData,
    isLoading,
    isError,
  } = useGetCandle({
    market: currentMarket,
    count,
  });

  const { prices, volume } = useChartData(candleData);

  return {
    prices,
    volume,
    isLoading,
    isError,
    currentMarket: market,
  };
};
