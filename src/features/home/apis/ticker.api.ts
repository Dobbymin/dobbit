import { UPBIT_URL } from "@/shared";

// Upbit /ticker 응답 타입 (https://docs.upbit.com/reference/ticker 참고)
export type ChangeState = "RISE" | "EVEN" | "FALL";

export interface TickerResponse {
  market: string; // 예: KRW-BTC
  trade_date: string; // YYYYMMDD
  trade_time: string; // HHMMSS
  trade_date_kst: string; // KST 기준 날짜
  trade_time_kst: string; // KST 기준 시간
  trade_timestamp: number; // 체결 타임스탬프 (ms)
  opening_price: number; // 시가
  high_price: number; // 고가
  low_price: number; // 저가
  trade_price: number; // 현재가
  prev_closing_price: number; // 전일 종가
  change: ChangeState; // 등락 상태
  change_price: number; // 변화 금액
  change_rate: number; // 변화율
  signed_change_price: number; // 부호 포함 변화 금액
  signed_change_rate: number; // 부호 포함 변화율
  trade_volume: number; // 최근 체결 거래량
  acc_trade_price: number; // 누적 거래대금 (UTC 0시 기준)
  acc_trade_price_24h: number; // 24시간 누적 거래대금
  acc_trade_volume: number; // 누적 거래량 (UTC 0시 기준)
  acc_trade_volume_24h: number; // 24시간 누적 거래량
  highest_52_week_price: number; // 52주 최고가
  highest_52_week_date: string; // 52주 최고가 날짜 (YYYY-MM-DD)
  lowest_52_week_price: number; // 52주 최저가
  lowest_52_week_date: string; // 52주 최저가 날짜 (YYYY-MM-DD)
  timestamp: number; // 데이터 생성 타임스탬프 (ms)
}

// // 숫자 필드가 문자열로 올 수 있는 (복붙/가공) 상황을 안전하게 처리하기 위한 헬퍼
// function toNumber(v: unknown): number {
//   if (typeof v === "number") return v;
//   if (typeof v === "string") {
//     // 끝에 붙은 콤마 제거 후 콤마(천단위) 제거
//     const cleaned = v.replace(/,+$/g, "").replace(/,/g, "");
//     const num = Number(cleaned);
//     return isNaN(num) ? 0 : num;
//   }
//   return 0;
// }

// function toStr(v: unknown): string {
//   if (typeof v === "string") return v;
//   if (v == null) return "";
//   return String(v);
// }

// // Raw 형태를 받아 Ticker로 매핑 (방어적 파싱)
// function mapRawToTicker(raw: unknown): Ticker {
//   const r = raw as Record<string, unknown>;
//   return {
//     market: toStr(r.market),
//     trade_date: toStr(r.trade_date),
//     trade_time: toStr(r.trade_time),
//     trade_date_kst: toStr(r.trade_date_kst),
//     trade_time_kst: toStr(r.trade_time_kst),
//     trade_timestamp: toNumber(r.trade_timestamp),
//     opening_price: toNumber(r.opening_price),
//     high_price: toNumber(r.high_price),
//     low_price: toNumber(r.low_price),
//     trade_price: toNumber(r.trade_price),
//     prev_closing_price: toNumber(r.prev_closing_price),
//     change: toStr(r.change) as ChangeState,
//     change_price: toNumber(r.change_price),
//     change_rate: toNumber(r.change_rate),
//     signed_change_price: toNumber(r.signed_change_price),
//     signed_change_rate: toNumber(r.signed_change_rate),
//     trade_volume: toNumber(r.trade_volume),
//     acc_trade_price: toNumber(r.acc_trade_price),
//     acc_trade_price_24h: toNumber(r.acc_trade_price_24h),
//     acc_trade_volume: toNumber(r.acc_trade_volume),
//     acc_trade_volume_24h: toNumber(r.acc_trade_volume_24h),
//     highest_52_week_price: toNumber(r.highest_52_week_price),
//     highest_52_week_date: toStr(r.highest_52_week_date),
//     lowest_52_week_price: toNumber(r.lowest_52_week_price),
//     lowest_52_week_date: toStr(r.lowest_52_week_date),
//     timestamp: toNumber(r.timestamp),
//   };
// }

// 여러 마켓 티커 조회 (예: ["KRW-BTC", "KRW-ETH"])
export const tickerAPI = async (markets: string[]): Promise<TickerResponse[]> => {
  const query = markets.join(",");
  const res = await fetch(`${UPBIT_URL}/ticker?markets=${query}`, {
    cache: "no-store", // 최신 데이터 우선
  });
  if (!res.ok) {
    console.error("Upbit ticker error", res.status, res.statusText);
    throw new Error("Failed to fetch ticker data");
  }
  const data: TickerResponse[] = await res.json();
  return data;
};

// // 단일 마켓 편의 함수
// export async function fetchSingleTicker(market: string): Promise<Ticker | null> {
//   const list = await fetchTicker([market]);
//   return list[0] ?? null;
// }
