import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type MarketState = {
  market: string;
  signedChangePrice: number;
  koreanName: string;
  tradePrice: number;
  changeRate: number;
};

const initialState: MarketState = {
  market: "BTC/KRW",
  signedChangePrice: 0,
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
            state.tradePrice = payload.tradePrice;
            state.signedChangePrice = payload.signedChangePrice;
            state.changeRate = payload.changeRate;
          }),
        updateTicker: (payload: Pick<MarketState, "tradePrice" | "changeRate" | "signedChangePrice">) =>
          set((state) => {
            state.tradePrice = payload.tradePrice;
            state.signedChangePrice = payload.signedChangePrice;
            state.changeRate = payload.changeRate;
          }),
        clearMarket: () =>
          set((state) => {
            state.market = "BTC/KRW";
            state.koreanName = "비트코인";
            state.tradePrice = 0;
            state.signedChangePrice = 0;
            state.changeRate = 0;
          }),
      })),
    ),
    { name: "MarketStore" },
  ),
);
