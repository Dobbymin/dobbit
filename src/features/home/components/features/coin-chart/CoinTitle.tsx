"use client";

import { changePriceFormat, rateColor, rateFormat, useGetMarket } from "@/entities";
import { cn } from "@/shared";

export const CoinTitle = () => {
  const { market, koreanName, tradePrice, changeRate, signedChangePrice } = useGetMarket();
  return (
    <div className='flex items-center justify-between border-b border-white/10 p-2'>
      <div>
        <h2 className='text-xl font-bold text-text-dark'>{koreanName}</h2>
        <p className='text-sm text-text-muted-dark'>{market}</p>
      </div>
      <div className='text-right'>
        <div className={cn(rateColor(changeRate), "flex items-end justify-end gap-1 font-semibold")}>
          <p className='text-2xl'>{tradePrice?.toLocaleString("ko-KR")}</p>
          <p className='text-sm'>KRW</p>
        </div>
        <div className='flex justify-end gap-3'>
          <p className={cn(rateColor(changeRate), "text-sm")}>{rateFormat(changeRate)}</p>
          <p className={cn(rateColor(signedChangePrice), "text-sm")}>{changePriceFormat(signedChangePrice)}</p>
        </div>
      </div>
    </div>
  );
};
