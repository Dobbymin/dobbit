"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/shared";
import { ApexOptions } from "apexcharts";

import { useCoinChartViewModel } from "../../../hooks";

// SSR 비활성화
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const CoinChartDisplay = () => {
  const { prices, volume, isLoading } = useCoinChartViewModel(50);

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

  if (isLoading) return <Skeleton className='h-[492px] w-full' />;

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
