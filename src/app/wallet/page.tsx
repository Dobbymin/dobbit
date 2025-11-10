"use client";

import { useState } from "react";

import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared";
import { Pie, PieChart } from "recharts";

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/shared/components/ui/chart";

type TabType = "보유자산" | "투자손익" | "거래내역" | "입출금내역";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<TabType>("보유자산");

  const tabs: TabType[] = ["보유자산", "투자손익", "거래내역", "입출금내역"];

  const tabStyle = (isActive: boolean) => {
    return isActive
      ? "border-b-2 border-primary font-semibold text-primary hover:text-primary"
      : "text-white hover:underline hover:underline-offset-2";
  };

  const statsData = [
    [
      { label: "보유 KRW", value: "100,000", unit: "KRW" },
      { label: "총보유 자산", value: "1,000", unit: "KRW" },
    ],
    [
      { label: "총 매수", value: "1,000", unit: "KRW" },
      { label: "총 평가", value: "1,000", unit: "KRW" },
    ],
    [
      { label: "총평가손익", value: "+10,000", unit: "KRW" },
      { label: "총평가수익률", value: "+30.21", unit: "%" },
    ],
  ];

  const chartData = [
    { asset: "ETH", value: 40, fill: "#8fa96f" },
    { asset: "XRP", value: 50, fill: "#e0e0e0" },
  ];

  const chartConfig = {
    value: { label: "비율" },
    ETH: { label: "ETH", color: "#8fa96f" },
  } satisfies ChartConfig;

  const assetList = [
    {
      name: "이더리움",
      symbol: "ETH",
      quantity: "0.00001189",
      buyPrice: "30,201,000",
      currentPrice: "148,200",
      profitRate: "+125",
      profitAmount: "+148,200",
      isProfit: true,
    },
    {
      name: "리플",
      symbol: "XRP",
      quantity: "1,250.50",
      buyPrice: "1,500,000",
      currentPrice: "1,680,000",
      profitRate: "+12",
      profitAmount: "+180,000",
      isProfit: true,
    },
    {
      name: "비트코인",
      symbol: "BTC",
      quantity: "0.0025",
      buyPrice: "100,000,000",
      currentPrice: "95,000,000",
      profitRate: "-5",
      profitAmount: "-5,000,000",
      isProfit: false,
    },
    {
      name: "카르다노",
      symbol: "ADA",
      quantity: "5,000",
      buyPrice: "2,500,000",
      currentPrice: "2,750,000",
      profitRate: "+10",
      profitAmount: "+250,000",
      isProfit: true,
    },
    {
      name: "폴카닷",
      symbol: "DOT",
      quantity: "150",
      buyPrice: "1,200,000",
      currentPrice: "1,080,000",
      profitRate: "-10",
      profitAmount: "-120,000",
      isProfit: false,
    },
    {
      name: "솔라나",
      symbol: "SOL",
      quantity: "10.5",
      buyPrice: "2,100,000",
      currentPrice: "2,520,000",
      profitRate: "+20",
      profitAmount: "+420,000",
      isProfit: true,
    },
    {
      name: "체인링크",
      symbol: "LINK",
      quantity: "200",
      buyPrice: "3,000,000",
      currentPrice: "2,850,000",
      profitRate: "-5",
      profitAmount: "-150,000",
      isProfit: false,
    },
    {
      name: "라이트코인",
      symbol: "LTC",
      quantity: "15",
      buyPrice: "1,500,000",
      currentPrice: "1,650,000",
      profitRate: "+10",
      profitAmount: "+150,000",
      isProfit: true,
    },
    {
      name: "이오스",
      symbol: "EOS",
      quantity: "800",
      buyPrice: "800,000",
      currentPrice: "720,000",
      profitRate: "-10",
      profitAmount: "-80,000",
      isProfit: false,
    },
    {
      name: "스텔라루멘",
      symbol: "XLM",
      quantity: "10,000",
      buyPrice: "1,000,000",
      currentPrice: "1,150,000",
      profitRate: "+15",
      profitAmount: "+150,000",
      isProfit: true,
    },
  ];

  return (
    <div className='flex h-full w-full flex-col gap-4'>
      {/* Tab Navigation */}
      <aside className='flex h-14 w-full border-b border-white/10 bg-surface-dark/20'>
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant='ghost'
            onClick={() => setActiveTab(tab)}
            className={`h-full flex-1 rounded-none bg-surface-dark/20 ${tabStyle(activeTab === tab)}`}
          >
            {tab}
          </Button>
        ))}
      </aside>

      {/* Main Content */}
      <section className='flex w-full gap-4'>
        {/* Stats Area - 70% */}
        <article className='flex h-full w-[70%] flex-col bg-surface-dark/20 p-6'>
          {statsData.map((row, rowIndex) => (
            <div key={rowIndex}>
              <Table>
                <TableBody>
                  <TableRow>
                    {row.map((stat, statIndex) => (
                      <TableCell key={statIndex} className='w-1/2 px-6 py-4'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm text-gray-400'>{stat.label}</span>
                          <div className='flex items-end gap-1'>
                            <span className='text-xl font-bold'>{stat.value}</span>
                            <span className='text-xs font-bold text-gray-400'>{stat.unit}</span>
                          </div>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
              {rowIndex === 0 && <div className='my-4 border-t border-white/10' />}
            </div>
          ))}
        </article>

        {/* Chart Area - 30% */}
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
                  innerRadius={50}
                  outerRadius={80}
                  strokeWidth={0}
                />
                <ChartLegend content={<ChartLegendContent />} verticalAlign='bottom' className='flex-wrap gap-2' />
              </PieChart>
            </ChartContainer>
            {/* 중앙 텍스트 */}
            <div className='absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center'>
              <div className='text-center text-xs text-gray-400'>
                보유 비중
                <br />
                (%)
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* 보유자산 목록 */}
      <section className='mt-6'>
        <h2 className='mb-4 text-lg font-semibold'>보유자산 목록</h2>
        <Table className='w-full bg-surface-dark/20'>
          <TableHeader>
            <TableRow className='border-b border-text-muted-dark/20'>
              <TableHead className='text-center text-white'>보유자산</TableHead>
              <TableHead className='text-center text-white'>보유수량</TableHead>
              <TableHead className='text-center text-white'>매수금액</TableHead>
              <TableHead className='text-center text-white'>평가금액</TableHead>
              <TableHead className='text-center text-white'>평가손익(%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assetList.map((asset, index) => (
              <TableRow className='border-b border-text-muted-dark/20' key={index}>
                <TableCell className='text-left text-white'>
                  <div className='flex flex-col items-start gap-1'>
                    <p className='font-semibold'>{asset.name}</p>
                    <p className='text-sm font-light text-gray-400'>{asset.symbol}</p>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-1 text-white'>
                    <p>{asset.quantity}</p>
                    <p className='text-xs font-semibold text-gray-400'>{asset.symbol}</p>
                  </div>
                </TableCell>
                <TableCell className='text-right text-white'>
                  <div className='flex items-center justify-end gap-1'>
                    <p>{asset.buyPrice}</p>
                    <p className='text-xs font-semibold text-gray-400'>KRW</p>
                  </div>
                </TableCell>
                <TableCell className='text-right text-white'>
                  <div className='flex items-center justify-end gap-1'>
                    <p>{asset.currentPrice}</p>
                    <p className='text-xs font-semibold text-gray-400'>KRW</p>
                  </div>
                </TableCell>
                <TableCell className={`text-right ${asset.isProfit ? "text-increase" : "text-decrease"} `}>
                  <div className='flex flex-col items-end gap-1'>
                    <div className='flex items-center gap-2'>
                      <p>{asset.profitRate}</p>
                      <p className='text-sm font-semibold text-gray-400'>%</p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm'>{asset.profitAmount}</p>
                      <p className='text-xs font-semibold text-gray-400'>KRW</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
