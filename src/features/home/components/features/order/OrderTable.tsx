"use client";

import { useEffect } from "react";

import { syncMarketOrderAPI, useMarketOrderRealtime } from "@/entities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared";
import { useMutation } from "@tanstack/react-query";

export const OrderTable = () => {
  const market = "KRW-WAXP";
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
  const askOrders = orderbookUnits.slice(0, 6); // 매도 호가
  const bidOrders = orderbookUnits.slice(0, 6); // 매수 호가

  // 현재가 판단: 첫 번째 호가의 매수/매도 가격 비교
  const firstOrder = orderbookUnits[0];
  const currentPrice = firstOrder?.ask_price || firstOrder?.bid_price || 0;
  const isBidPrice = firstOrder?.bid_price === currentPrice;
  const currentVolume = isBidPrice ? firstOrder?.bid_size : firstOrder?.ask_size;

  // 최대 거래량 계산 (그래프 바 비율 계산용)
  const maxBidSize = Math.max(...bidOrders.map((o) => o.bid_size), 0);
  const maxAskSize = Math.max(...askOrders.map((o) => o.ask_size), 0);
  const maxVolume = Math.max(maxBidSize, maxAskSize);

  return (
    <Table>
      <TableHeader>
        <TableRow className='py-10'>
          <TableHead className='text-md border-b-2 border-text-dark/20 py-4 text-center font-semibold text-text-dark'>
            호가
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* 매수 호가 (Bid) - 파란색 */}
        {bidOrders.reverse().map((order, index) => {
          const volumePercent = maxVolume > 0 ? (order.bid_size / maxVolume) * 100 : 0;
          return (
            <TableRow
              key={`bid-${index}`}
              className='relative flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-50'
            >
              {/* 그래프 바 배경 */}
              <div className='absolute top-2 left-0 h-7 bg-blue-200' style={{ width: `${volumePercent}%` }} />

              <TableCell className='relative z-10 w-1/3 text-end font-roboto text-black'>
                {order.bid_size.toLocaleString()}
              </TableCell>
              <TableCell className='relative z-10 w-1/3 text-center font-roboto font-semibold text-increase'>
                {order.bid_price.toLocaleString()}
              </TableCell>
              <TableCell className='relative z-10 w-1/3' />
            </TableRow>
          );
        })}

        {/* 현재가 구분선 */}
        <TableRow className='relative flex h-full bg-white px-0 text-sm hover:bg-gray-50'>
          {/* 현재가 그래프 바 (매수/매도에 따라 방향 다름) */}
          {currentVolume && (
            <div
              className={`absolute top-2 h-8 ${isBidPrice ? "left-0 bg-blue-300/30" : "right-0 bg-red-300"}`}
              style={{
                width: `${maxVolume > 0 ? ((currentVolume / maxVolume) * 100) / 3 : 0}%`,
              }}
            />
          )}

          <TableCell className='relative z-10 w-1/3 text-end font-roboto text-sm font-medium text-black'>
            {isBidPrice ? currentVolume?.toLocaleString() : ""}
          </TableCell>
          <TableCell className='relative z-10 w-1/3 border-2 border-black text-center font-roboto text-base font-bold text-black'>
            {currentPrice.toLocaleString()}
          </TableCell>
          <TableCell className='relative z-10 w-1/3 items-center text-start font-roboto text-sm font-medium text-black'>
            {!isBidPrice ? currentVolume?.toLocaleString() : ""}
          </TableCell>
        </TableRow>

        {/* 매도 호가 (Ask) - 빨간색 */}
        {askOrders.map((order, index) => {
          const volumePercent = maxVolume > 0 ? (order.ask_size / maxVolume) * 100 : 0;
          return (
            <TableRow
              key={`ask-${index}`}
              className='relative flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-50'
            >
              {/* 그래프 바 배경 (오른쪽에서 시작) */}
              <div className='absolute top-2 right-0 h-7 bg-red-200' style={{ width: `${volumePercent}%` }} />

              <TableCell className='relative z-10 w-1/3' />
              <TableCell className='relative z-10 w-1/3 text-center font-roboto font-semibold text-decrease'>
                {order.ask_price.toLocaleString()}
              </TableCell>
              <TableCell className='relative z-10 w-1/3 text-start font-roboto text-black'>
                {order.ask_size.toLocaleString()}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
