"use client";

import dynamic from "next/dynamic";

import type { ApexOptions } from "apexcharts";

// ReactApexChart를 dynamic import로 변경 (SSR 비활성화)
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// 더미 데이터: 이미지와 유사한 패턴 (30분 간격, 약 48시간)
const ohlcData = [
  // 11/9 6:00부터 시작 - 초기 하락 구간
  { x: new Date("2025-11-09T06:00:00").getTime(), y: [152300000, 152500000, 151800000, 152000000] },
  { x: new Date("2025-11-09T06:30:00").getTime(), y: [152000000, 152200000, 151600000, 151700000] },
  { x: new Date("2025-11-09T07:00:00").getTime(), y: [151700000, 151900000, 151400000, 151500000] },
  { x: new Date("2025-11-09T07:30:00").getTime(), y: [151500000, 151700000, 151200000, 151400000] },
  { x: new Date("2025-11-09T08:00:00").getTime(), y: [151400000, 151600000, 151100000, 151300000] },
  { x: new Date("2025-11-09T08:30:00").getTime(), y: [151300000, 151500000, 151000000, 151200000] },
  { x: new Date("2025-11-09T09:00:00").getTime(), y: [151200000, 151400000, 150900000, 151000000] },
  { x: new Date("2025-11-09T09:30:00").getTime(), y: [151000000, 151200000, 150700000, 150900000] },
  { x: new Date("2025-11-09T10:00:00").getTime(), y: [150900000, 151100000, 150600000, 150800000] },
  { x: new Date("2025-11-09T10:30:00").getTime(), y: [150800000, 151000000, 150500000, 150700000] },
  { x: new Date("2025-11-09T11:00:00").getTime(), y: [150700000, 150900000, 150400000, 150600000] },
  { x: new Date("2025-11-09T11:30:00").getTime(), y: [150600000, 150800000, 150300000, 150500000] },

  // 횡보 구간
  { x: new Date("2025-11-09T12:00:00").getTime(), y: [150500000, 150700000, 150300000, 150600000] },
  { x: new Date("2025-11-09T12:30:00").getTime(), y: [150600000, 150800000, 150400000, 150500000] },
  { x: new Date("2025-11-09T13:00:00").getTime(), y: [150500000, 150700000, 150300000, 150600000] },
  { x: new Date("2025-11-09T13:30:00").getTime(), y: [150600000, 150800000, 150400000, 150500000] },
  { x: new Date("2025-11-09T14:00:00").getTime(), y: [150500000, 150700000, 150300000, 150400000] },
  { x: new Date("2025-11-09T14:30:00").getTime(), y: [150400000, 150600000, 150200000, 150500000] },
  { x: new Date("2025-11-09T15:00:00").getTime(), y: [150500000, 150700000, 150300000, 150400000] },
  { x: new Date("2025-11-09T15:30:00").getTime(), y: [150400000, 150600000, 150200000, 150300000] },

  // 급등 구간 시작
  { x: new Date("2025-11-09T16:00:00").getTime(), y: [150300000, 151500000, 150200000, 151200000] },
  { x: new Date("2025-11-09T16:30:00").getTime(), y: [151200000, 152000000, 151000000, 151800000] },
  { x: new Date("2025-11-09T17:00:00").getTime(), y: [151800000, 152500000, 151600000, 152300000] },
  { x: new Date("2025-11-09T17:30:00").getTime(), y: [152300000, 153000000, 152100000, 152800000] },
  { x: new Date("2025-11-09T18:00:00").getTime(), y: [152800000, 153500000, 152600000, 153200000] },

  // 조정 후 재상승
  { x: new Date("2025-11-09T18:30:00").getTime(), y: [153200000, 153400000, 152800000, 153000000] },
  { x: new Date("2025-11-09T19:00:00").getTime(), y: [153000000, 153200000, 152600000, 152800000] },
  { x: new Date("2025-11-09T19:30:00").getTime(), y: [152800000, 153000000, 152400000, 152700000] },
  { x: new Date("2025-11-09T20:00:00").getTime(), y: [152700000, 152900000, 152300000, 152600000] },
  { x: new Date("2025-11-09T20:30:00").getTime(), y: [152600000, 152800000, 152200000, 152500000] },
  { x: new Date("2025-11-09T21:00:00").getTime(), y: [152500000, 152700000, 152100000, 152400000] },
  { x: new Date("2025-11-09T21:30:00").getTime(), y: [152400000, 152600000, 152000000, 152300000] },
  { x: new Date("2025-11-09T22:00:00").getTime(), y: [152300000, 152500000, 151900000, 152200000] },

  // 11/10 - 상승 추세 지속
  { x: new Date("2025-11-10T00:00:00").getTime(), y: [152200000, 152800000, 152100000, 152600000] },
  { x: new Date("2025-11-10T00:30:00").getTime(), y: [152600000, 153200000, 152500000, 153000000] },
  { x: new Date("2025-11-10T01:00:00").getTime(), y: [153000000, 153600000, 152900000, 153400000] },
  { x: new Date("2025-11-10T01:30:00").getTime(), y: [153400000, 154000000, 153300000, 153800000] },
  { x: new Date("2025-11-10T02:00:00").getTime(), y: [153800000, 154400000, 153700000, 154200000] },
  { x: new Date("2025-11-10T02:30:00").getTime(), y: [154200000, 154800000, 154100000, 154600000] },
  { x: new Date("2025-11-10T03:00:00").getTime(), y: [154600000, 155200000, 154500000, 155000000] },
  { x: new Date("2025-11-10T03:30:00").getTime(), y: [155000000, 155600000, 154900000, 155400000] },
  { x: new Date("2025-11-10T04:00:00").getTime(), y: [155400000, 156000000, 155300000, 155800000] },

  // 조정 및 횡보
  { x: new Date("2025-11-10T06:00:00").getTime(), y: [155800000, 156000000, 155400000, 155600000] },
  { x: new Date("2025-11-10T06:30:00").getTime(), y: [155600000, 155800000, 155200000, 155400000] },
  { x: new Date("2025-11-10T07:00:00").getTime(), y: [155400000, 155600000, 155000000, 155200000] },
  { x: new Date("2025-11-10T07:30:00").getTime(), y: [155200000, 155400000, 154800000, 155000000] },
  { x: new Date("2025-11-10T08:00:00").getTime(), y: [155000000, 155200000, 154600000, 154800000] },
  { x: new Date("2025-11-10T08:30:00").getTime(), y: [154800000, 155000000, 154400000, 154600000] },
  { x: new Date("2025-11-10T09:00:00").getTime(), y: [154600000, 154800000, 154200000, 154400000] },

  // 급락 구간
  { x: new Date("2025-11-10T09:30:00").getTime(), y: [154400000, 154500000, 153500000, 153800000] },
  { x: new Date("2025-11-10T10:00:00").getTime(), y: [153800000, 154000000, 152800000, 153200000] },
  { x: new Date("2025-11-10T10:30:00").getTime(), y: [153200000, 153400000, 152400000, 152800000] },

  // 회복 및 상승
  { x: new Date("2025-11-10T11:00:00").getTime(), y: [152800000, 153400000, 152700000, 153200000] },
  { x: new Date("2025-11-10T11:30:00").getTime(), y: [153200000, 153800000, 153100000, 153600000] },
  { x: new Date("2025-11-10T12:00:00").getTime(), y: [153600000, 154200000, 153500000, 154000000] },
  { x: new Date("2025-11-10T12:30:00").getTime(), y: [154000000, 154600000, 153900000, 154400000] },
  { x: new Date("2025-11-10T13:00:00").getTime(), y: [154400000, 155000000, 154300000, 154800000] },
  { x: new Date("2025-11-10T13:30:00").getTime(), y: [154800000, 155400000, 154700000, 155200000] },
  { x: new Date("2025-11-10T14:00:00").getTime(), y: [155200000, 155800000, 155100000, 155600000] },
  { x: new Date("2025-11-10T14:30:00").getTime(), y: [155600000, 156200000, 155500000, 156000000] },
  { x: new Date("2025-11-10T15:00:00").getTime(), y: [156000000, 156600000, 155900000, 156400000] },

  // 11/11 - 최근 상승 및 조정
  { x: new Date("2025-11-11T00:00:00").getTime(), y: [156400000, 157000000, 156300000, 156800000] },
  { x: new Date("2025-11-11T00:30:00").getTime(), y: [156800000, 157400000, 156700000, 157200000] },
  { x: new Date("2025-11-11T01:00:00").getTime(), y: [157200000, 157800000, 157100000, 157600000] },
  { x: new Date("2025-11-11T01:30:00").getTime(), y: [157600000, 158200000, 157500000, 158000000] },
  { x: new Date("2025-11-11T02:00:00").getTime(), y: [158000000, 158600000, 157900000, 158400000] },
  { x: new Date("2025-11-11T02:30:00").getTime(), y: [158400000, 159000000, 158300000, 158800000] },
  { x: new Date("2025-11-11T03:00:00").getTime(), y: [158800000, 159400000, 158700000, 159200000] },
  { x: new Date("2025-11-11T03:30:00").getTime(), y: [159200000, 159800000, 159100000, 159600000] },
  { x: new Date("2025-11-11T04:00:00").getTime(), y: [159600000, 160200000, 159500000, 160000000] },
  { x: new Date("2025-11-11T04:30:00").getTime(), y: [160000000, 160600000, 159900000, 160400000] },
  { x: new Date("2025-11-11T05:00:00").getTime(), y: [160400000, 161000000, 160300000, 160800000] },
  { x: new Date("2025-11-11T05:30:00").getTime(), y: [160800000, 161400000, 160700000, 161200000] },
  { x: new Date("2025-11-11T06:00:00").getTime(), y: [161200000, 161800000, 161100000, 161600000] },
  { x: new Date("2025-11-11T06:30:00").getTime(), y: [161600000, 162200000, 161500000, 162000000] },
  { x: new Date("2025-11-11T07:00:00").getTime(), y: [162000000, 162600000, 161900000, 162400000] },
  { x: new Date("2025-11-11T07:30:00").getTime(), y: [162400000, 163000000, 162300000, 162800000] },
  { x: new Date("2025-11-11T08:00:00").getTime(), y: [162800000, 163400000, 162700000, 163200000] },
  { x: new Date("2025-11-11T08:30:00").getTime(), y: [163200000, 163800000, 163100000, 163600000] },
  { x: new Date("2025-11-11T09:00:00").getTime(), y: [163600000, 164200000, 163500000, 164000000] },
  { x: new Date("2025-11-11T09:30:00").getTime(), y: [164000000, 164600000, 163900000, 164400000] },
  { x: new Date("2025-11-11T10:00:00").getTime(), y: [164400000, 165000000, 164300000, 164800000] },
  { x: new Date("2025-11-11T10:30:00").getTime(), y: [164800000, 165400000, 164700000, 165200000] },
  { x: new Date("2025-11-11T11:00:00").getTime(), y: [165200000, 165800000, 165100000, 165600000] },
  { x: new Date("2025-11-11T11:30:00").getTime(), y: [165600000, 166200000, 165500000, 166000000] },
  { x: new Date("2025-11-11T12:00:00").getTime(), y: [166000000, 166600000, 165900000, 166400000] },
];

const volumeData = [
  { x: new Date("2025-11-09T06:00:00").getTime(), y: 45 },
  { x: new Date("2025-11-09T06:30:00").getTime(), y: 50 },
  { x: new Date("2025-11-09T07:00:00").getTime(), y: 55 },
  { x: new Date("2025-11-09T07:30:00").getTime(), y: 48 },
  { x: new Date("2025-11-09T08:00:00").getTime(), y: 52 },
  { x: new Date("2025-11-09T08:30:00").getTime(), y: 58 },
  { x: new Date("2025-11-09T09:00:00").getTime(), y: 62 },
  { x: new Date("2025-11-09T09:30:00").getTime(), y: 70 },
  { x: new Date("2025-11-09T10:00:00").getTime(), y: 65 },
  { x: new Date("2025-11-09T10:30:00").getTime(), y: 60 },
  { x: new Date("2025-11-09T11:00:00").getTime(), y: 55 },
  { x: new Date("2025-11-09T11:30:00").getTime(), y: 50 },
  { x: new Date("2025-11-09T12:00:00").getTime(), y: 48 },
  { x: new Date("2025-11-09T12:30:00").getTime(), y: 45 },
  { x: new Date("2025-11-09T13:00:00").getTime(), y: 42 },
  { x: new Date("2025-11-09T13:30:00").getTime(), y: 40 },
  { x: new Date("2025-11-09T14:00:00").getTime(), y: 38 },
  { x: new Date("2025-11-09T14:30:00").getTime(), y: 35 },
  { x: new Date("2025-11-09T15:00:00").getTime(), y: 40 },
  { x: new Date("2025-11-09T15:30:00").getTime(), y: 45 },
  { x: new Date("2025-11-09T16:00:00").getTime(), y: 180 },
  { x: new Date("2025-11-09T16:30:00").getTime(), y: 150 },
  { x: new Date("2025-11-09T17:00:00").getTime(), y: 140 },
  { x: new Date("2025-11-09T17:30:00").getTime(), y: 130 },
  { x: new Date("2025-11-09T18:00:00").getTime(), y: 120 },
  { x: new Date("2025-11-09T18:30:00").getTime(), y: 110 },
  { x: new Date("2025-11-09T19:00:00").getTime(), y: 100 },
  { x: new Date("2025-11-09T19:30:00").getTime(), y: 95 },
  { x: new Date("2025-11-09T20:00:00").getTime(), y: 90 },
  { x: new Date("2025-11-09T20:30:00").getTime(), y: 85 },
  { x: new Date("2025-11-09T21:00:00").getTime(), y: 80 },
  { x: new Date("2025-11-09T21:30:00").getTime(), y: 75 },
  { x: new Date("2025-11-09T22:00:00").getTime(), y: 70 },
  { x: new Date("2025-11-10T00:00:00").getTime(), y: 88 },
  { x: new Date("2025-11-10T00:30:00").getTime(), y: 95 },
  { x: new Date("2025-11-10T01:00:00").getTime(), y: 102 },
  { x: new Date("2025-11-10T01:30:00").getTime(), y: 110 },
  { x: new Date("2025-11-10T02:00:00").getTime(), y: 118 },
  { x: new Date("2025-11-10T02:30:00").getTime(), y: 125 },
  { x: new Date("2025-11-10T03:00:00").getTime(), y: 132 },
  { x: new Date("2025-11-10T03:30:00").getTime(), y: 140 },
  { x: new Date("2025-11-10T04:00:00").getTime(), y: 135 },
  { x: new Date("2025-11-10T06:00:00").getTime(), y: 85 },
  { x: new Date("2025-11-10T06:30:00").getTime(), y: 80 },
  { x: new Date("2025-11-10T07:00:00").getTime(), y: 75 },
  { x: new Date("2025-11-10T07:30:00").getTime(), y: 70 },
  { x: new Date("2025-11-10T08:00:00").getTime(), y: 68 },
  { x: new Date("2025-11-10T08:30:00").getTime(), y: 65 },
  { x: new Date("2025-11-10T09:00:00").getTime(), y: 72 },
  { x: new Date("2025-11-10T09:30:00").getTime(), y: 165 },
  { x: new Date("2025-11-10T10:00:00").getTime(), y: 155 },
  { x: new Date("2025-11-10T10:30:00").getTime(), y: 145 },
  { x: new Date("2025-11-10T11:00:00").getTime(), y: 128 },
  { x: new Date("2025-11-10T11:30:00").getTime(), y: 120 },
  { x: new Date("2025-11-10T12:00:00").getTime(), y: 112 },
  { x: new Date("2025-11-10T12:30:00").getTime(), y: 105 },
  { x: new Date("2025-11-10T13:00:00").getTime(), y: 98 },
  { x: new Date("2025-11-10T13:30:00").getTime(), y: 92 },
  { x: new Date("2025-11-10T14:00:00").getTime(), y: 88 },
  { x: new Date("2025-11-10T14:30:00").getTime(), y: 85 },
  { x: new Date("2025-11-10T15:00:00").getTime(), y: 82 },
  { x: new Date("2025-11-11T00:00:00").getTime(), y: 95 },
  { x: new Date("2025-11-11T00:30:00").getTime(), y: 102 },
  { x: new Date("2025-11-11T01:00:00").getTime(), y: 108 },
  { x: new Date("2025-11-11T01:30:00").getTime(), y: 115 },
  { x: new Date("2025-11-11T02:00:00").getTime(), y: 122 },
  { x: new Date("2025-11-11T02:30:00").getTime(), y: 128 },
  { x: new Date("2025-11-11T03:00:00").getTime(), y: 135 },
  { x: new Date("2025-11-11T03:30:00").getTime(), y: 142 },
  { x: new Date("2025-11-11T04:00:00").getTime(), y: 148 },
  { x: new Date("2025-11-11T04:30:00").getTime(), y: 155 },
  { x: new Date("2025-11-11T05:00:00").getTime(), y: 162 },
  { x: new Date("2025-11-11T05:30:00").getTime(), y: 170 },
  { x: new Date("2025-11-11T06:00:00").getTime(), y: 178 },
  { x: new Date("2025-11-11T06:30:00").getTime(), y: 185 },
  { x: new Date("2025-11-11T07:00:00").getTime(), y: 192 },
  { x: new Date("2025-11-11T07:30:00").getTime(), y: 200 },
  { x: new Date("2025-11-11T08:00:00").getTime(), y: 195 },
  { x: new Date("2025-11-11T08:30:00").getTime(), y: 188 },
  { x: new Date("2025-11-11T09:00:00").getTime(), y: 180 },
  { x: new Date("2025-11-11T09:30:00").getTime(), y: 175 },
  { x: new Date("2025-11-11T10:00:00").getTime(), y: 168 },
  { x: new Date("2025-11-11T10:30:00").getTime(), y: 160 },
  { x: new Date("2025-11-11T11:00:00").getTime(), y: 155 },
  { x: new Date("2025-11-11T11:30:00").getTime(), y: 150 },
  { x: new Date("2025-11-11T12:00:00").getTime(), y: 145 },
];

const series = [
  {
    type: "candlestick" as const,
    name: "BTC/KRW",
    data: ohlcData,
  },
  {
    type: "bar" as const,
    name: "Volume",
    data: volumeData,
  },
];

const options: ApexOptions = {
  chart: {
    type: "candlestick" as const,
    height: 500,
    id: "candles",
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    zoom: { enabled: true },
    background: "transparent",
  },
  grid: {
    show: true,
    borderColor: "#2d2d2d",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  plotOptions: {
    bar: {
      columnWidth: "50%",
      colors: {
        ranges: [{ from: 0, to: 300, color: "#4a9eff" }],
      },
    },
    candlestick: {
      colors: {
        upward: "#ef5350",
        downward: "#26a69a",
      },
      wick: {
        useFillColor: true,
      },
    },
  },
  xaxis: {
    type: "datetime" as const,
    labels: {
      style: {
        colors: "#9ca3af",
        fontSize: "11px",
      },
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
        hour: "HH:mm",
      },
    },
    axisBorder: {
      show: true,
      color: "#2d2d2d",
    },
    axisTicks: {
      show: true,
      color: "#2d2d2d",
    },
  },
  yaxis: [
    {
      seriesName: "BTC/KRW",
      opposite: true,
      tooltip: { enabled: false },
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "11px",
        },
        formatter: (value) => {
          return `${(value / 1000000).toFixed(1)}M`;
        },
      },
      axisBorder: {
        show: true,
        color: "#2d2d2d",
      },
    },
    {
      seriesName: "Volume",
      show: false,
      min: 0,
      max: 400,
    },
  ],
  tooltip: {
    enabled: true,
    shared: false,
    theme: "dark",
    style: {
      fontSize: "12px",
    },
    custom: function ({ seriesIndex, dataPointIndex, w }) {
      const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
      if (seriesIndex === 0 && data?.y) {
        const [open, high, low, close] = data.y;
        const change = close - open;
        const changePercent = ((change / open) * 100).toFixed(2);
        const color = change >= 0 ? "#ef5350" : "#26a69a";

        return `
          <div style="padding: 12px; background: #1f2937; color: white; border-radius: 6px; border: 1px solid #374151;">
            <div style="font-weight: bold; margin-bottom: 8px; color: ${color};">BTC/KRW</div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #9ca3af; margin-right: 20px;">시가:</span>
              <span>₩${open.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #9ca3af; margin-right: 20px;">고가:</span>
              <span>₩${high.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #9ca3af; margin-right: 20px;">저가:</span>
              <span>₩${low.toLocaleString()}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #9ca3af; margin-right: 20px;">종가:</span>
              <span style="color: ${color}; font-weight: bold;">₩${close.toLocaleString()}</span>
            </div>
            <div style="border-top: 1px solid #374151; padding-top: 8px; color: ${color};">
              ${change >= 0 ? "▲" : "▼"} ${Math.abs(change).toLocaleString()} (${changePercent}%)
            </div>
          </div>
        `;
      }
      return "";
    },
  },
  legend: {
    show: false,
  },
  theme: {
    mode: "dark",
  },
  annotations: {
    xaxis: [],
    yaxis: [],
  },
};

export const CoinChartDisplay = () => {
  return (
    <div className='w-full bg-surface-dark p-4'>
      <ReactApexChart options={options} series={series} type='candlestick' height={500} />
    </div>
  );
};
