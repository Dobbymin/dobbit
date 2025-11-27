"use client";

import { useEffect } from "react";

import { syncMarketOrderAPI, useGetMarket, useMarketOrderRealtime } from "@/entities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared";
import { useMutation } from "@tanstack/react-query";

export const OrderTable = () => {
  const { market } = useGetMarket();
  const { data: marketOrder, isLoading, error } = useMarketOrderRealtime(market);

  const { mutate: syncData } = useMutation({
    mutationFn: () => syncMarketOrderAPI(market),
    onError: (error) => {
      console.error("Sync failed:", error);
    },
    onSuccess: () => {
      console.log("Sync successful");
    },
  });

  // 주기적으로 Upbit 데이터를 Supabase에 동기화
  useEffect(() => {
    // 즉시 실행
    syncData();

    // TODO: 구현 후 다시 1000 으로 수정
    // 1초마다 동기화
    const interval = setInterval(() => {
      syncData();
    }, 1000);

    return () => clearInterval(interval);
  }, [market, syncData]);

  if (error) {
    return <div className='p-4 text-center text-red-500'>Error: {error.message}</div>;
  }

  if (isLoading || !marketOrder) {
    return <div className='p-4 text-center'>Loading...</div>;
  }

  // 호가 데이터를 매도/매수로 분리 (최대 15개씩)
  const orderbookUnits = marketOrder.orderbook_units || [];
  const askOrders = orderbookUnits.slice(0, 15).reverse(); // 매도 호가
  const bidOrders = orderbookUnits.slice(0, 15); // 매수 호가

  // 최대 거래량 계산 (그래프 바 비율 계산용)
  const maxBidSize = Math.max(...bidOrders.map((o) => o.bid_size), 0);
  const maxAskSize = Math.max(...askOrders.map((o) => o.ask_size), 0);
  const maxVolume = Math.max(maxBidSize, maxAskSize);

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b-3 border-text-dark/20'>
          <TableHead className='text-md py-4 text-center font-semibold text-text-dark' colSpan={3}>
            호가
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* 매도 호가 (Ask) - 파란색 */}
        {askOrders.map((order, index) => {
          const volumePercent = maxVolume > 0 ? (order.ask_size / maxVolume) * 100 : 0;
          return (
            <TableRow
              key={`ask-${order.ask_price}-${index}`}
              className='border-b border-white bg-blue-100 text-sm hover:bg-blue-50'
            >
              <TableCell className='relative w-1/3 p-0'>
                {/* 그래프 바 배경 (오른쪽에서 왼쪽으로) */}
                <div className='absolute top-0 right-0 h-full bg-blue-200' style={{ width: `${volumePercent}%` }} />
                <div className='relative z-10 px-4 py-2 text-end font-roboto text-xs text-black'>
                  {order.ask_size.toLocaleString()}
                </div>
              </TableCell>
              <TableCell className='relative w-1/3 p-0'>
                <div className='relative z-10 px-4 py-2 text-center font-roboto font-semibold text-increase'>
                  {order.ask_price.toLocaleString()}
                </div>
              </TableCell>
              <TableCell className='w-1/3' />
            </TableRow>
          );
        })}

        {/* 매수 호가 (Bid) - 빨간색 */}
        {bidOrders.map((order, index) => {
          const volumePercent = maxVolume > 0 ? (order.bid_size / maxVolume) * 100 : 0;
          return (
            <TableRow
              key={`bid-${order.bid_price}-${index}`}
              className='border-b border-white bg-red-100 text-sm hover:bg-red-50'
            >
              <TableCell className='w-1/3' />
              <TableCell className='relative w-1/3 border-white p-0'>
                <div className='relative z-10 px-4 py-2 text-center font-roboto font-semibold text-decrease'>
                  {order.bid_price.toLocaleString()}
                </div>
              </TableCell>
              <TableCell className='relative w-1/3 border-white p-0'>
                {/* 그래프 바 배경 (오른쪽에서 왼쪽으로) */}
                <div className='absolute inset-0 right-0 h-full bg-red-200' style={{ width: `${volumePercent}%` }} />
                <div className='relative z-10 px-4 py-2 text-start font-roboto text-xs text-black'>
                  {order.bid_size.toLocaleString()}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
