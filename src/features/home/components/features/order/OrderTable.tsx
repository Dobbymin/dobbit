"use client";

import { useGetMarketOrder } from "@/entities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared";

export const OrderTable = () => {
  const { data: orderData } = useGetMarketOrder("KRW-WAXP");

  // 배열의 첫 번째 요소 가져오기
  const marketOrder = orderData?.[0];

  console.log("Market Order Data:", marketOrder);

  if (!marketOrder) {
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
        {bidOrders.reverse().map((order, index) => (
          <TableRow
            key={`bid-${index}`}
            className='flex h-full border-white bg-blue-100 px-0 text-sm hover:bg-blue-300'
          >
            <TableCell className='w-1/3 text-end font-roboto text-black'>{order.bid_size.toLocaleString()}</TableCell>
            <TableCell className='w-1/3 text-center font-roboto text-black'>
              {order.bid_price.toLocaleString()}
            </TableCell>
            <TableCell className='w-1/3' />
          </TableRow>
        ))}

        {/* 현재가 구분선 */}
        <TableRow className='flex h-full border-white bg-yellow-100 px-0 text-sm hover:bg-yellow-200'>
          <TableCell className='w-1/3 text-end font-roboto text-black'>
            {isBidPrice ? currentVolume?.toLocaleString() : ""}
          </TableCell>
          <TableCell className='w-1/3 border-2 border-black text-center font-bold text-black'>
            {currentPrice.toLocaleString()}
          </TableCell>
          <TableCell className='w-1/3 text-start font-roboto text-black'>
            {!isBidPrice ? currentVolume?.toLocaleString() : ""}
          </TableCell>
        </TableRow>

        {/* 매도 호가 (Ask) - 빨간색 */}
        {askOrders.map((order, index) => (
          <TableRow key={`ask-${index}`} className='flex h-full border-white bg-red-100 px-0 text-sm hover:bg-red-300'>
            <TableCell className='w-1/3' />
            <TableCell className='w-1/3 text-center font-roboto text-black'>
              {order.ask_price.toLocaleString()}
            </TableCell>
            <TableCell className='w-1/3 text-start font-roboto text-black'>{order.ask_size.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
