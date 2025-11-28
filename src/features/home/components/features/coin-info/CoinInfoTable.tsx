"use client";

import { useMemo } from "react";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared";

import { useGetMarketInfo } from "../../../hooks";
import { MarketInfoTable } from "../../common";

type Props = {
  searchKeyword: string;
};

export const CoinInfoTable = ({ searchKeyword }: Props) => {
  const { data: marketInfoData } = useGetMarketInfo();

  // 검색어로 필터링 (코인명, 마켓 심볼 기준)
  const filteredMarketData = useMemo(() => {
    if (!marketInfoData) return [];
    if (!searchKeyword.trim()) return marketInfoData;

    const keyword = searchKeyword.toLowerCase();
    return marketInfoData.filter(
      (ticker) => ticker.koreanName.toLowerCase().includes(keyword) || ticker.market.toLowerCase().includes(keyword),
    );
  }, [marketInfoData, searchKeyword]);

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
          {filteredMarketData.length > 0 ? (
            filteredMarketData.map((ticker) => <MarketInfoTable key={ticker.market} {...ticker} />)
          ) : (
            <tr>
              <td colSpan={3} className='py-8 text-center text-text-muted-dark'>
                검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
