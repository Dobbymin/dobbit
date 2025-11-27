"use client";

import { rateColor, useGetMarket } from "@/entities";
import { cn } from "@/shared";

export const CoinTitle = () => {
  const { market, koreanName, tradePrice, changeRate } = useGetMarket();
  return (
    <div className='flex items-center justify-between border-b border-white/10 p-4'>
      <div>
        <h2 className='text-lg font-bold text-text-dark'>{market}</h2>
        <p className='text-sm text-text-muted-dark'>{koreanName}</p>
      </div>
      <div className='text-right font-mono'>
        <p className='text-2xl font-semibold text-text-dark'>{tradePrice.toLocaleString("ko-KR")}</p>
        <p className={cn(rateColor(changeRate), "text-sm")}>{changeRate.toFixed(2)}%</p>
      </div>
    </div>
  );
};
