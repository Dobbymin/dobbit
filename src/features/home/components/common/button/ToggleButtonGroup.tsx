import React from "react";

import { Button, useTabStyle } from "@/shared";

import { TabType } from "../../../types";

const tabs: TabType[] = ["매수", "매도", "거래내역"];

type Props = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

export const ToggleButtonGroup = ({ activeTab, setActiveTab }: Props) => {
  const tabStyle = useTabStyle;

  return (
    <nav className='flex h-14 w-full border-b border-white/10 bg-surface-dark/20'>
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
    </nav>
  );
};
