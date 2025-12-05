import { UPBIT_URL } from "@/shared";

import { CandleData, CandleParams, MinutesCandleParams } from "../types";

export const candleAPI = async (params: CandleParams): Promise<CandleData[]> => {
  const { market, to, count, type } = params;

  const searchParams = new URLSearchParams({
    market,
    count: count.toString(),
  });

  if (to) {
    searchParams.append("to", to);
  }

  // 타입별 엔드포인트를 명확히 스위치로 분기 (분봉은 Path 파라미터 필수)
  const endpoint = (() => {
    switch (type) {
      case "minutes": {
        const { unit } = params as MinutesCandleParams;
        if (!unit) {
          throw new Error("Minute candle request requires a valid unit (1|3|5|10|15|30|60|240)");
        }
        return `${UPBIT_URL}/candles/minutes/${unit}`;
      }
      case "seconds":
      case "days":
      case "weeks":
      case "months":
        return `${UPBIT_URL}/candles/${type}`;
      default:
        // 타입 확장 시 안전장치
        throw new Error(`Unsupported candle type: ${type as string}`);
    }
  })();

  const url = `${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Candle API error: ${response.status} ${response.statusText}`);
  }

  const data: CandleData[] = await response.json();
  return data;
};
