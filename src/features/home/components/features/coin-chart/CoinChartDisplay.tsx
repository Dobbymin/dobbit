"use client";

import dynamic from "next/dynamic";

import { useMemo } from "react";

import { useGetCandle, useGetMarket } from "@/entities";
import { Skeleton } from "@/shared";
import { ApexOptions } from "apexcharts";

// SSR 비활성화
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const CoinChartDisplay = () => {
  const { market } = useGetMarket();

  const apiMarket = useMemo(() => {
    if (!market) return "KRW-BTC"; // 기본값 설정 (방어 코드)

    // "/"가 포함된 경우 (BTC/KRW 형식일 때)
    if (market.includes("/")) {
      const [coin, currency] = market.split("/"); // ["BTC", "KRW"]
      return `${currency}-${coin}`; // "KRW-BTC"
    }

    // 만약 이미 "KRW-BTC" 형식이거나 다른 형식이면 그대로 반환
    return market;
  }, [market]);

  const { data: candleData, isLoading } = useGetCandle({ market: apiMarket, count: 50 });

  // 데이터 변환 로직 (Memoization)
  const { prices, volume } = useMemo(() => {
    if (!candleData || candleData.length === 0) {
      return { prices: [], volume: [] };
    }

    const sortedData = [...candleData].sort(
      (a, b) => new Date(a.candle_date_time_kst).getTime() - new Date(b.candle_date_time_kst).getTime(),
    );

    const parseKstToUtc = (kstString: string) => {
      return new Date(kstString + "Z").getTime();
    };

    const pricesData = sortedData.map((item) => ({
      x: parseKstToUtc(item.candle_date_time_kst),
      y: [
        item.opening_price, // Open
        item.high_price, // High
        item.low_price, // Low
        item.trade_price, // Close (현재가/종가)
      ],
    }));

    // 3. 거래량 데이터 변환
    const volumeData = sortedData.map((item) => ({
      x: parseKstToUtc(item.candle_date_time_kst),
      y: item.candle_acc_trade_volume.toFixed(3), // 소수점 정리
    }));

    return { prices: pricesData, volume: volumeData };
  }, [candleData]);

  const candleOptions: ApexOptions = {
    chart: {
      type: "candlestick",
      id: "candles",
      toolbar: { autoSelected: "pan", show: false },
      zoom: { enabled: false },
      background: "transparent",
    },
    theme: { mode: "dark" },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "var(--increase)",
          downward: "var(--decrease)", // 하락 (초록/파랑)
        },
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: true }, // 메인 차트 X축 라벨 보이기
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (val) => Math.floor(val).toLocaleString(),
      },
    },
    grid: { borderColor: "#333" },
  };

  const barOptions: ApexOptions = {
    chart: {
      type: "bar",
      id: "brush",
      brush: {
        enabled: true,
        target: "candles",
      },
      selection: {
        enabled: true,
        fill: { color: "#ccc", opacity: 0.4 },
        stroke: { color: "#0D47A1" },
        // 초기 선택 범위: 데이터의 마지막 20% 구간
        xaxis: {
          min: prices.length > 30 ? prices[prices.length - 30].x : undefined,
          max: prices.length > 0 ? prices[prices.length - 1].x : undefined,
        },
      },
      background: "transparent",
    },
    theme: { mode: "dark" },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        columnWidth: "100%",
        colors: {
          ranges: [{ from: 0, to: 1000000000, color: "#555" }], // 거래량 색상 통일
        },
      },
    },
    stroke: { width: 0 },
    xaxis: {
      type: "datetime",
      tooltip: { enabled: false },
      axisBorder: { offsetX: 13 },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false },
  };

  // 로딩 중이거나 데이터가 없을 때 처리
  if (isLoading) return <Skeleton className='h-[492px] w-full' />;
  if (!candleData) return null;

  return (
    <div className='w-full bg-surface-dark'>
      <div id='chart-candlestick'>
        <ReactApexChart
          options={candleOptions}
          series={[{ name: "Price", data: prices }]}
          type='candlestick'
          height={300}
          width='100%'
        />
      </div>

      <div id='chart-bar'>
        <ReactApexChart
          options={barOptions}
          series={[{ name: "Volume", data: volume }]}
          type='bar'
          height={140}
          width='100%'
        />
      </div>
    </div>
  );
};
