import type { CandleParams } from "@/entities";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ChartTimeframe = "1초" | "1분" | "5분" | "30분" | "1시간" | "주" | "달" | "년";

interface ChartState {
  selectedTimeframe: ChartTimeframe;
  setSelectedTimeframe: (timeframe: ChartTimeframe) => void;
  // 현재 선택된 타임프레임에 따른 API 파라미터 생성
  getCandleParams: (market: string, count: number) => CandleParams;
}

/**
 * 타임프레임을 API 파라미터로 변환
 */
const timeframeToAPIParams = (timeframe: ChartTimeframe, market: string, count: number): CandleParams => {
  const baseParams = { market, count };

  switch (timeframe) {
    case "1초":
      return { ...baseParams, type: "seconds" };
    case "1분":
      return { ...baseParams, type: "minutes", unit: 1 };
    case "5분":
      return { ...baseParams, type: "minutes", unit: 5 };
    case "30분":
      return { ...baseParams, type: "minutes", unit: 30 };
    case "1시간":
      return { ...baseParams, type: "minutes", unit: 60 };
    case "주":
      return { ...baseParams, type: "weeks" };
    case "달":
      return { ...baseParams, type: "months" };
    case "년":
      return { ...baseParams, type: "days" };
    default:
      return { ...baseParams, type: "seconds" };
  }
};

export const useChartStore = create<ChartState>()(
  devtools(
    (set) => ({
      selectedTimeframe: "1초",
      setSelectedTimeframe: (timeframe: ChartTimeframe) => set({ selectedTimeframe: timeframe }),
      getCandleParams: (market: string, count: number) =>
        timeframeToAPIParams(
          // state에서 현재 timeframe을 가져오기 위해서는 별도 처리 필요
          // 이 함수는 직접 사용하지 않고, useCandleParams hook 사용 권장
          "1초",
          market,
          count,
        ),
    }),
    { name: "ChartStore" },
  ),
);

/**
 * 현재 선택된 타임프레임을 API 파라미터로 변환하는 hook
 */
export const useCandleParams = (market: string, count: number): CandleParams => {
  const selectedTimeframe = useChartStore((state) => state.selectedTimeframe);
  return timeframeToAPIParams(selectedTimeframe, market, count);
};
