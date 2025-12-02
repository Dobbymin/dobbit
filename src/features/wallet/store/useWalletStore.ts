import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { TickerData } from "@/features/home/apis";

import { WalletEntity } from "@/entities/wallet";

import { CostBasis } from "../utils/aggregate-trades";

interface WalletState {
  // State
  wallets: WalletEntity[];
  tickerMap: Record<string, TickerData>; // Key: "COMP/KRW" (Display format)
  costBasisMap: Record<string, CostBasis>; // Key: "COMP/KRW" (Display format)

  // Actions
  setWallets: (wallets: WalletEntity[]) => void;
  setTickerMap: (tickerMap: Record<string, TickerData>) => void;
  setCostBasisMap: (map: Record<string, CostBasis>) => void;

  // Getters (Computeds)
  getCoinEvaluation: (coinId: string, amount: number) => number; // 개별 코인 평가액
  getTotalCoinEvaluation: () => number; // 코인만 평가액 합계
  getTotalEvaluation: () => number; // 전체 자산 (KRW + 코인)
  getTotalPurchase: () => number; // 총 매수금액
  getTotalProfitLoss: () => number; // 총 평가손익
  getTotalProfitRate: () => number; // 총 수익률
}

export const useWalletStore = create<WalletState>()(
  devtools((set, get) => ({
    // --- Initial State ---
    wallets: [],
    tickerMap: {},
    costBasisMap: {},

    // --- Actions ---
    setWallets: (wallets) => set({ wallets }),
    setTickerMap: (tickerMap) => set({ tickerMap }),
    setCostBasisMap: (map) => set({ costBasisMap: map }),

    // --- Getters ---

    // 1. 특정 코인의 현재 평가금액 (현재가 * 수량)
    getCoinEvaluation: (coinId, amount) => {
      if (coinId === "KRW") return amount;

      const { tickerMap } = get();
      const ticker = tickerMap[coinId];

      if (!ticker) return 0;
      return ticker.trade_price * amount;
    },

    // 2. 코인들의 평가금액 총합 (보유 KRW 제외)
    getTotalCoinEvaluation: () => {
      const { wallets, getCoinEvaluation } = get();
      return wallets
        .filter((w) => w.coin_id !== "KRW")
        .reduce((total, w) => total + getCoinEvaluation(w.coin_id, w.amount), 0);
    },

    // 3. 총 보유자산 (보유 KRW + 코인 평가금액)
    getTotalEvaluation: () => {
      const { wallets, getCoinEvaluation } = get();
      return wallets.reduce((total, wallet) => {
        return total + getCoinEvaluation(wallet.coin_id, wallet.amount);
      }, 0);
    },

    // 4. 총 매수금액 (보유 수량 * 평단가)
    // *중요: 단순히 costBasisMap의 totalCost를 쓰면 안 됩니다.
    // 매도 후 남은 잔량에 대한 원가만 계산해야 하므로 (수량 * 평단가) 공식을 씁니다.
    getTotalPurchase: () => {
      const { wallets, costBasisMap } = get();

      return wallets
        .filter((w) => w.coin_id !== "KRW" && w.amount > 0)
        .reduce((sum, w) => {
          const costInfo = costBasisMap[w.coin_id];

          // 평단가가 없으면 0원으로 처리 (혹은 현재가로 처리할 수도 있으나 보수적으로 0)
          const avgPrice = costInfo?.avgPrice ?? 0;

          return sum + w.amount * avgPrice;
        }, 0);
    },

    // 5. 총 평가손익 (총 평가금액 - 총 매수금액)
    getTotalProfitLoss: () => {
      const totalEval = get().getTotalCoinEvaluation(); // 코인만 계산
      const totalBuy = get().getTotalPurchase(); // 코인만 계산
      return totalEval - totalBuy;
    },

    // 6. 총 수익률 ((평가손익 / 매수금액) * 100)
    getTotalProfitRate: () => {
      const profitLoss = get().getTotalProfitLoss();
      const totalBuy = get().getTotalPurchase();

      if (totalBuy === 0) return 0; // 0으로 나누기 방지
      return (profitLoss / totalBuy) * 100;
    },
  })),
);
