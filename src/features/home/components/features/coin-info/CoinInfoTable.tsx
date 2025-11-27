"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared";

import { useGetMarketInfo } from "../../../hooks";
import { MarketInfoTable } from "../../common";

export const CoinInfoTable = () => {
  const { data: marketInfoData } = useGetMarketInfo();

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
            <MarketInfoTable key={ticker.market} {...ticker} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
