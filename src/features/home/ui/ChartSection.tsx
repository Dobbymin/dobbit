"use client";

import { useEffect } from "react";

import { useGetMarket, useUpdateTicker } from "@/entities";

import { ChartControls, CoinChartDisplay, CoinTitle } from "../components";
import { useRealtimeTicker } from "../hooks";

export const ChartSection = () => {
  const { market } = useGetMarket();
  const { tickerMap } = useRealtimeTicker(market);
  const updateTicker = useUpdateTicker();

  useEffect(() => {
    const ticker = tickerMap[market];
    if (ticker) {
      updateTicker({
        tradePrice: ticker.trade_price,
        changeRate: parseFloat((ticker.signed_change_rate * 100).toFixed(2)),
        signedChangePrice: ticker.signed_change_price,
      });
    }
  }, [tickerMap, market, updateTicker]);

  return (
    <section className='flex w-full flex-col p-4'>
      <CoinTitle />
      <ChartControls />
      <CoinChartDisplay />
    </section>
  );
};
