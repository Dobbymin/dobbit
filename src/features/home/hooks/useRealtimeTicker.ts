import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";

import { TickerData, getTickerAPI } from "../apis";

/**
 * 코인의 실시간 시세를 구독하는 hook
 * @param markets 조회할 마켓 (예: "KRW-BTC,KRW-ETH")
 * @param refetchInterval 갱신 주기 (ms), 기본값 1000ms (1초)
 */
export const useRealtimeTicker = (markets: string, refetchInterval: number = 500) => {
  const { data } = useQuery({
    queryKey: ["ticker", markets],
    queryFn: () => getTickerAPI(markets),
    refetchInterval,
  });

  // useMemo를 사용하여 data가 변경될 때만 tickerMap 재계산
  const tickerMap = useMemo(() => {
    if (!data?.data) return {};

    const map: Record<string, TickerData> = {};
    data.data.forEach((ticker) => {
      map[ticker.market] = ticker;
    });
    return map;
  }, [data]);

  return {
    tickerMap,
    getTicker: (market: string) => tickerMap[market],
    getCurrentPrice: (market: string) => tickerMap[market]?.trade_price || 0,
  };
};
