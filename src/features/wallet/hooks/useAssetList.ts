import { useMemo } from "react";

import { useWalletStore } from "../store";

export type AssetItem = {
  name: string;
  symbol: string;
  quantity: string;
  buyPrice: string;
  currentPrice: string;
  profitRate: string;
  profitAmount: string;
  isProfit: boolean;
};

/**
 * 보유 자산 목록 데이터를 가공하는 훅
 * 지갑 데이터를 UI에 표시할 형식으로 변환
 */
export const useAssetList = (): AssetItem[] => {
  const { wallets, tickerMap, costBasisMap, getCoinEvaluation } = useWalletStore();

  const assetList = useMemo(() => {
    // KRW를 제외한 코인만 필터링
    const coinWallets = wallets.filter((w) => w.coin_id !== "KRW");

    return coinWallets.map((wallet) => {
      const ticker = tickerMap[wallet.coin_id];
      const evaluation = getCoinEvaluation(wallet.coin_id, wallet.amount);

      // 현재 보유 수량 × 평단가 = 매수 원가
      const costInfo = costBasisMap[wallet.coin_id];
      const avgPrice = costInfo?.avgPrice ?? 0;
      const buyTotalAmount = wallet.amount * avgPrice;

      // 손익 계산
      const profitAmount = evaluation - buyTotalAmount;
      const profitRate = buyTotalAmount > 0 ? (profitAmount / buyTotalAmount) * 100 : 0;

      // 마켓 코드에서 코인 심볼 추출 (예: "COMP/KRW" -> "COMP")
      const symbol = wallet.coin_id.includes("/") ? wallet.coin_id.split("/")[0] : wallet.coin_id;

      return {
        name: ticker?.market || wallet.coin_id,
        symbol,
        quantity: wallet.amount.toFixed(8),
        buyPrice: buyTotalAmount.toLocaleString("ko-KR"),
        currentPrice: evaluation.toLocaleString("ko-KR"),
        profitRate: `${profitRate >= 0 ? "+" : ""}${profitRate.toFixed(2)}`,
        profitAmount: `${profitAmount >= 0 ? "+" : ""}${profitAmount.toLocaleString("ko-KR")}`,
        isProfit: profitAmount >= 0,
      };
    });
  }, [wallets, tickerMap, costBasisMap, getCoinEvaluation]);

  return assetList;
};
