"use client";

import { useShallow } from "zustand/react/shallow";

import { useMarketStore } from "../store";

export const useGetMarket = () => {
  const marketInfo = useMarketStore(
    useShallow((state) => ({
      koreanName: state.koreanName,
      changeRate: state.changeRate,
      market: state.market,
      tradePrice: state.tradePrice,
    })),
  );
  return marketInfo;
};

export const useSetMarket = () => {
  const setMarket = useMarketStore((state) => state.setMarket);
  return setMarket;
};

export const useClearMarket = () => {
  const clearMarket = useMarketStore((state) => state.clearMarket);
  return clearMarket;
};

export const getMarket = () => {
  const state = useMarketStore.getState();
  return {
    changeRate: state.changeRate,
    koreanName: state.koreanName,
    market: state.market,
    tradePrice: state.tradePrice,
  };
};
