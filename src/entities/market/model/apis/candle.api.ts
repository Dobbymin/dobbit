import { UPBIT_URL } from "@/shared";

import { CandleData, CandleParams, MinutesCandleParams } from "../types";

export const candleAPI = async (params: CandleParams): Promise<CandleData[]> => {
  const { market, to, count, type } = params;

  // URL 파라미터 구성
  const urlParams = new URLSearchParams({
    market,
    count: count.toString(),
  });

  if (to) {
    urlParams.append("to", to);
  }

  // 타입별 엔드포인트 구성
  let endpoint = `${UPBIT_URL}/candles/${type}`;

  // 분 캔들의 경우 unit을 Path 파라미터로 추가
  if (type === "minutes") {
    const unit = (params as MinutesCandleParams).unit;
    endpoint = `${UPBIT_URL}/candles/minutes/${unit}`;
  }

  const url = `${endpoint}?${urlParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Candle API error: ${response.status} ${response.statusText}`);
  }

  const data: CandleData[] = await response.json();
  return data;
};
