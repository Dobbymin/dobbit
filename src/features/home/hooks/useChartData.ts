import { CandleData, ChartSeriesData } from "@/entities";

export const useChartData = (candleData: CandleData[] | undefined): ChartSeriesData => {
  // 1. 방어 코드: 데이터가 없으면 빈 배열 반환
  if (!candleData || candleData.length === 0) {
    return { prices: [], volume: [] };
  }

  const sortedData = [...candleData].sort(
    (a, b) => new Date(a.candle_date_time_kst).getTime() - new Date(b.candle_date_time_kst).getTime(),
  );

  const parseKstToUtc = (kstString: string) => {
    return new Date(kstString + "Z").getTime();
  };

  const prices = sortedData.map((item) => ({
    x: parseKstToUtc(item.candle_date_time_kst),
    y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
  }));

  const volume = sortedData.map((item) => ({
    x: parseKstToUtc(item.candle_date_time_kst),
    y: item.candle_acc_trade_volume.toFixed(3),
  }));

  return { prices, volume };
};
