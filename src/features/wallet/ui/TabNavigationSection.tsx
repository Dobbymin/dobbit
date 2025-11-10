import { Button } from "@/shared";

import { useTabStyle } from "../hooks";
import { TabType } from "../types";

type Props = {
  activeTab: TabType;
  setActiveTab: (tabs: TabType) => void;
};

export const TabNavigationSection = ({ activeTab, setActiveTab }: Props) => {
  const tabs: TabType[] = ["보유자산", "투자손익", "거래내역", "입출금내역"];

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
