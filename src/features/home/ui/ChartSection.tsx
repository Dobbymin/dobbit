"use client";

import { useEffect } from "react";

import { useMarketStore } from "@/entities";

import { ChartControls, CoinChartDisplay, CoinTitle } from "../components";
import { useGetBTCInfo } from "../hooks";

export const ChartSection = () => {
  const { data: btcInfo, isSuccess } = useGetBTCInfo();

  const setMarket = useMarketStore((s) => s.setMarket);

  useEffect(() => {
    if (isSuccess && btcInfo) {
      setMarket({
        market: btcInfo.market,
        koreanName: btcInfo.koreanName,
        changeRate: btcInfo.changeRate,
        tradePrice: btcInfo.tradePrice,
        signedChangePrice: btcInfo.signedChangePrice,
      });
    }
  }, [isSuccess, btcInfo, setMarket]);

  return (
    <section className='flex w-full flex-col p-4'>
      <CoinTitle />
      <ChartControls />
      <CoinChartDisplay />
    </section>
  );
};
