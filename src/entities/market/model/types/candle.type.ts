/**
 * 캔들 타입
 * - seconds: 초 단위 (1초 고정)
 * - minutes: 분 단위 (1, 3, 5, 10, 15, 30, 60, 240분)
 * - days: 일 단위
 * - weeks: 주 단위
 * - months: 월 단위
 */
export type CandleType = "seconds" | "minutes" | "days" | "weeks" | "months";

/**
 * 분 단위 캔들 옵션
 * Upbit API에서 지원하는 분 단위
 */
export type MinuteUnit = 1 | 3 | 5 | 10 | 15 | 30 | 60 | 240;

type SecondsCandleParams = {
  type: "seconds";
} & BaseCandleParams;

export type MinutesCandleParams = {
  type: "minutes";
  unit: MinuteUnit;
} & BaseCandleParams;

type OtherCandleParams = {
  type: "days" | "weeks" | "months";
} & BaseCandleParams;

type BaseCandleParams = {
  market: string;
  to?: string;
  count: number;
};

export type CandleParams = SecondsCandleParams | MinutesCandleParams | OtherCandleParams;
