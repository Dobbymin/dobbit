"use client";

import { Separator } from "@/shared";

import { type ChartTimeframe, useChartStore } from "../../../store";
import { ChartOptionButton, TimeframeButton } from "../../common";

const timeframes: ChartTimeframe[] = ["1초", "1분", "5분", "30분", "1시간", "주", "달", "년"];

export const ChartControls = () => {
  const selectedTimeframe = useChartStore((state) => state.selectedTimeframe);
  const setSelectedTimeframe = useChartStore((state) => state.setSelectedTimeframe);

  return (
    <div className='flex items-center gap-2 border-b border-white/10 p-2'>
      {timeframes.map((timeframe) => (
        <TimeframeButton
          key={timeframe}
          timeframe={timeframe}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />
      ))}
      <Separator orientation='vertical' className='data-[orientation=vertical]:h-7' />
      <ChartOptionButton>차트설정</ChartOptionButton>
      <ChartOptionButton>지표</ChartOptionButton>
    </div>
  );
};
