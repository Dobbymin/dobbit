import { Separator, Table, TableBody, TableCell, TableRow } from "@/shared";

import { TableItem } from "../components";
import { useRealtimeWallet } from "../hooks";
import { useWalletStore } from "../store";

export const StatsAreaSection = () => {
  // 실시간 지갑 데이터 구독
  useRealtimeWallet();

  // Zustand store에서 계산된 값 가져오기
  const {
    wallets,
    getTotalEvaluation,
    getTotalCoinEvaluation,
    getTotalPurchase,
    getTotalProfitLoss,
    getTotalProfitRate,
  } = useWalletStore();

  // KRW 잔고
  const krwWallet = wallets.find((w) => w.coin_id === "KRW");
  const heldKRW = krwWallet?.amount || 0;

  // 총 평가액 (보유 KRW + 코인 평가금액)
  const totalEvaluation = getTotalEvaluation();

  // 총 매수 (현재 보유 코인의 원가 합계)
  const totalPurchase = getTotalPurchase();

  // 총 평가 손익
  const totalProfitLoss = getTotalProfitLoss();

  // 총 평가 수익률
  const totalProfitRate = getTotalProfitRate();

  // 총 보유 자산 = 보유 KRW + 코인 평가금액
  const totalCoinEval = getTotalCoinEvaluation();
  const totalAssets = heldKRW + totalCoinEval;

  const data = {
    heldKRW: heldKRW.toLocaleString("ko-KR"),
    totalAssets: totalAssets.toLocaleString("ko-KR"),
    totalBuy: totalPurchase.toLocaleString("ko-KR"),
    totalProfitLoss: `${totalProfitLoss >= 0 ? "+" : ""}${totalProfitLoss.toLocaleString("ko-KR")}`,
    totalEvaluation: totalEvaluation.toLocaleString("ko-KR"),
    totalProfitRate: `${totalProfitRate >= 0 ? "+" : ""}${totalProfitRate.toFixed(2)}`,
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
