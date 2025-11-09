"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, cn } from "@/shared";

import { useGetMarketInfo } from "../../../hooks";

export const CoinInfoTable = () => {
  const { data: marketInfoData } = useGetMarketInfo();
  const rateColor = (rate: number) => {
    return rate >= 0 ? "text-increase" : "text-decrease";
  };
  return (
    <div className='flex-1 overflow-y-auto'>
      <Table>
        <TableHeader>
          <TableRow className='sticky top-0 border-none bg-surface-dark/30'>
            <TableHead className='text-text-muted-dark'>마켓</TableHead>
            <TableHead className='text-text-muted-dark'>현재가</TableHead>
            <TableHead className='text-text-muted-dark'>변동률</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {marketInfoData?.map((ticker) => (
            <TableRow key={ticker.market} className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
              <TableCell className='flex flex-col font-medium'>
                <p className='font-sans text-xs font-semibold'>{ticker.koreanName}</p>
                <p className='font-roboto text-[10px] font-light'>{ticker.market}</p>
              </TableCell>
              <TableCell className='text-xs'>{Number(ticker.tradePrice).toLocaleString("ko-KR")}</TableCell>
              <TableCell className={cn(rateColor(ticker.changeRate), "font-roboto text-xs")}>
                {ticker.changeRate.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
