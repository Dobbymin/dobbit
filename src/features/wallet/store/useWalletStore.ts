import { create } from "zustand";

import { TickerData } from "@/features/home/apis";

import { WalletEntity } from "../types";
import { CostBasis } from "../utils/aggregate-trades";

interface WalletState {
  wallets: WalletEntity[];
  tickerMap: Record<string, TickerData>;
  costBasisMap: Record<string, CostBasis>; // 코인별 평균매수가/원가
  setWallets: (wallets: WalletEntity[]) => void;
  setTickerMap: (tickerMap: Record<string, TickerData>) => void;
  setCostBasisMap: (map: Record<string, CostBasis>) => void;
  getTotalEvaluation: () => number;
  getTotalPurchase: () => number;
  getTotalProfitLoss: () => number;
  getTotalProfitRate: () => number;
  getCoinEvaluation: (coinId: string, amount: number) => number;
  getTotalCoinEvaluation: () => number; // KRW 제외 코인 평가액 합계
  getCoinCostBasis: (coinId: string) => number; // 해당 코인의 총 원가
}

export const useWalletStore = create<WalletState>((set, get) => ({
  wallets: [],
  tickerMap: {},
  costBasisMap: {},

  setWallets: (wallets) => set({ wallets }),

  setTickerMap: (tickerMap) => set({ tickerMap }),
  setCostBasisMap: (map) => set({ costBasisMap: map }),

  // 특정 코인의 평가액 계산
  getCoinEvaluation: (coinId, amount) => {
    const { tickerMap } = get();
    if (coinId === "KRW") return amount;

    const ticker = tickerMap[coinId];
    if (!ticker) return 0;

    return ticker.trade_price * amount;
  },

  // 코인 평가액 총합 (KRW 제외)
  getTotalCoinEvaluation: () => {
    const { wallets, getCoinEvaluation } = get();
    return wallets
      .filter((w) => w.coin_id !== "KRW")
      .reduce((total, w) => total + getCoinEvaluation(w.coin_id, w.amount), 0);
  },

  // 특정 코인의 총 원가
  getCoinCostBasis: (coinId) => {
    const { costBasisMap } = get();
    return costBasisMap[coinId]?.totalCost ?? 0;
  },

  // 총 평가액 (모든 자산의 현재 가치 합계)
  getTotalEvaluation: () => {
    const { wallets, getCoinEvaluation } = get();
    return wallets.reduce((total, wallet) => {
      return total + getCoinEvaluation(wallet.coin_id, wallet.amount);
    }, 0);
  },

  // 총 매수액 (현재 보유 코인의 원가 합계)
  getTotalPurchase: () => {
    const { wallets, getCoinCostBasis } = get();
    return wallets
      .filter((w) => w.coin_id !== "KRW" && w.amount > 0)
      .reduce((sum, w) => sum + getCoinCostBasis(w.coin_id), 0);
  },

  // 총 평가 손익
  getTotalProfitLoss: () => {
    const { getTotalCoinEvaluation, getTotalPurchase } = get();
    return getTotalCoinEvaluation() - getTotalPurchase();
  },

  // 총 평가 수익률
  getTotalProfitRate: () => {
    const { getTotalProfitLoss, getTotalPurchase } = get();
    const purchase = getTotalPurchase();
    if (purchase === 0) return 0;
    return (getTotalProfitLoss() / purchase) * 100;
  },
}));
