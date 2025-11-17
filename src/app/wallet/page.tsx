"use client";

import { useState } from "react";

import {
  CashSection,
  ChartAreaSection,
  HeldAssetsListSection,
  StatsAreaSection,
  TabNavigationSection,
  TabType,
} from "@/features";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<TabType>("보유자산");

  return (
    <div className='flex h-full w-full flex-col gap-4'>
      <TabNavigationSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <CashSection />
      <section className='flex w-full gap-4'>
        <StatsAreaSection />
        <ChartAreaSection />
      </section>
      <HeldAssetsListSection />
    </div>
  );
}
