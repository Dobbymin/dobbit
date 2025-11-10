import { Separator, Table, TableBody, TableCell, TableRow } from "@/shared";

import { TableItem } from "../components";

export const StatsAreaSection = () => {
  const data = {
    heldKRW: "100,000",
    totalAssets: "1,000",
    totalBuy: "1,000",
    totalProfitLoss: "+10,000",
    totalEvaluation: "1,000",
    totalProfitRate: "+30.21",
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
