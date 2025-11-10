"use client";

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/shared";
import { Pie, PieChart } from "recharts";

export const ChartAreaSection = () => {
  const chartData = [
    { asset: "ETH", value: 40, fill: "#8fa96f" },
    { asset: "ADA", value: 10, fill: "#a3d9a5" },
    { asset: "XRP", value: 50, fill: "#e0e0e0" },
  ];

  const chartConfig = {
    value: { label: "비율" },
    ETH: { label: "ETH", color: "#8fa96f" },
    ADA: { label: "ADA", color: "#a3d9a5" },
    XRP: { label: "XRP", color: "#e0e0e0" },
  } satisfies ChartConfig;

  return (
    <aside className='flex h-full w-[30%] flex-col items-center justify-center bg-surface-dark/20 p-6'>
      <div className='relative h-[220px] w-full'>
        <ChartContainer config={chartConfig} className='h-full w-full'>
          <PieChart>
            <Pie
              data={chartData}
              dataKey='value'
              nameKey='asset'
              cx='50%'
              cy='50%'
              innerRadius={35}
              outerRadius={90}
              strokeWidth={0}
            />
            <ChartLegend
              content={<ChartLegendContent payload={undefined} />}
              verticalAlign='bottom'
              className='flex-wrap gap-2'
            />
          </PieChart>
        </ChartContainer>
        <div className='absolute top-3/7 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center'>
          <div className='text-center text-xs text-gray-400'>
            <p>보유 비중</p>
            (%)
          </div>
        </div>
      </div>
    </aside>
  );
};
