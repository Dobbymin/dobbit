import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type MarketState = {
  changeRate: number;
  koreanName: string;
  market: string;
  tradePrice: number;
};

const initialState: MarketState = {
  market: "KRW-BTC",
  koreanName: "비트코인",
  changeRate: 0,
  tradePrice: 0,
};

export const useMarketStore = create(
  devtools(
    immer(
      combine(initialState, (set) => ({
        setMarket: (payload: MarketState) =>
          set((state) => {
            state.market = payload.market;
            state.koreanName = payload.koreanName;
            state.changeRate = payload.changeRate;
            state.tradePrice = payload.tradePrice;
          }),
        clearMarket: () =>
          set((state) => {
            state.market = "KRW-BTC";
            state.koreanName = "비트코인";
            state.changeRate = 0;
            state.tradePrice = 0;
          }),
      })),
    ),
    { name: "MarketStore" },
  ),
);
