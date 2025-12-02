import { useMemo } from "react";

import { Separator, Table, TableBody, TableCell, TableRow } from "@/shared";

import { TableItem } from "../components";
import { useRealtimeWallet } from "../hooks";
import { useWalletStore } from "../store";

export const StatsAreaSection = () => {
  // 실시간 지갑 데이터 구독
  useRealtimeWallet();

  // Zustand store의 원시 상태 구독 (tickerMap, wallets, costBasisMap이 변경되면 재계산)
  const wallets = useWalletStore((state) => state.wallets);
  const tickerMap = useWalletStore((state) => state.tickerMap);
  const costBasisMap = useWalletStore((state) => state.costBasisMap);

  // useMemo로 계산 - tickerMap, wallets, costBasisMap 변경 시 재계산
  const stats = useMemo(() => {
    const krwWallet = wallets.find((w) => w.coin_id === "KRW");
    const heldKRW = krwWallet?.amount || 0;

    // getCoinEvaluation 로직을 직접 구현 (tickerMap 의존성 명시)
    const getCoinEval = (coinId: string, amount: number): number => {
      if (coinId === "KRW") return amount;

      // Display 형식("COMP/KRW")을 Upbit 형식("KRW-COMP")으로 변환
      const upbitFormat = coinId.includes("/") ? `${coinId.split("/")[1]}-${coinId.split("/")[0]}` : coinId;

      const ticker = tickerMap[upbitFormat] || tickerMap[coinId];
      if (!ticker) return 0;
      return ticker.trade_price * amount;
    };

    // 코인 평가액 계산
    const totalCoinEval = wallets
      .filter((w) => w.coin_id !== "KRW")
      .reduce((total, w) => total + getCoinEval(w.coin_id, w.amount), 0);

    // 총 보유 자산
    const totalAssets = heldKRW + totalCoinEval;

    // 총 평가액
    const totalEvaluation = wallets.reduce((total, wallet) => {
      return total + getCoinEval(wallet.coin_id, wallet.amount);
    }, 0);

    // 총 매수 금액
    const totalPurchase = wallets
      .filter((w) => w.coin_id !== "KRW" && w.amount > 0)
      .reduce((sum, w) => {
        const costInfo = costBasisMap[w.coin_id];
        const avgPrice = costInfo?.avgPrice ?? 0;
        return sum + w.amount * avgPrice;
      }, 0);

    // 총 평가 손익
    const totalProfitLoss = totalCoinEval - totalPurchase;

    // 총 평가 수익률
    const totalProfitRate = totalPurchase === 0 ? 0 : (totalProfitLoss / totalPurchase) * 100;

    return {
      heldKRW,
      totalAssets,
      totalEvaluation,
      totalPurchase,
      totalProfitLoss,
      totalProfitRate,
    };
  }, [wallets, tickerMap, costBasisMap]);

  // costBasisMap이 로드될 때까지 0으로 표시
  const isLoaded = Object.keys(costBasisMap).length > 0;

  const data = {
    heldKRW: stats.heldKRW.toLocaleString("ko-KR"),
    totalAssets: stats.totalAssets.toLocaleString("ko-KR"),
    totalBuy: (isLoaded ? stats.totalPurchase : 0).toLocaleString("ko-KR"),
    totalProfitLoss: `${stats.totalProfitLoss >= 0 ? "+" : ""}${stats.totalProfitLoss.toLocaleString("ko-KR")}`,
    totalEvaluation: stats.totalEvaluation.toLocaleString("ko-KR"),
    totalProfitRate: `${stats.totalProfitRate >= 0 ? "+" : ""}${stats.totalProfitRate.toFixed(2)}`,
  };

  return (
    <article className='flex h-full w-[70%] flex-col bg-surface-dark/20 px-2 py-6'>
      <Table>
        <TableBody>
          <TableRow className='flex w-full flex-col'>
            <TableCell className='flex w-full justify-between gap-10 px-6 py-4'>
              <TableItem label='보유 KRW' value={data.heldKRW} unit='KRW' />
              <TableItem label='총보유 자산' value={data.totalAssets} unit='KRW' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Separator className='my-4 border-t border-text-dark/10' />

      <Table>
        <TableBody>
          <TableRow className='flex w-full flex-col'>
            <TableCell className='flex w-full justify-between gap-10 px-6 py-6'>
              <TableItem label='총 매수' value={data.totalBuy} unit='KRW' />
              <TableItem label='총 평가 손익' value={data.totalProfitLoss} unit='KRW' />
            </TableCell>
            <TableCell className='flex w-full justify-between gap-10 px-6 py-4'>
              <TableItem label='총 평가' value={data.totalEvaluation} unit='KRW' />
              <TableItem label='총 평가 수익률' value={data.totalProfitRate} unit='%' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </article>
  );
};
