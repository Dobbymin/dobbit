import { CandleData, CandleParams, MinutesCandleParams } from "../types";

export const candleAPI = async (params: CandleParams): Promise<CandleData[]> => {
  const { market, to, count, type } = params;

  // Next.js API Route를 통해 서버 사이드에서 Upbit API 호출 (CORS/429 회피)
  const searchParams = new URLSearchParams({
    market,
    count: count.toString(),
    type,
  });

  // 분봉일 경우 unit 추가
  if (type === "minutes") {
    const { unit } = params as MinutesCandleParams;
    if (!unit) {
      throw new Error("Minute candle request requires a valid unit (1|3|5|10|15|30|60|240)");
    }
    searchParams.append("unit", unit.toString());
  }

  if (to) {
    searchParams.append("to", to);
  }

  const url = `/api/candle?${searchParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Candle API error: ${response.status} ${response.statusText}${errorData.error ? ` - ${errorData.error}` : ""}`,
    );
  }

  const data: CandleData[] = await response.json();
  return data;
};
