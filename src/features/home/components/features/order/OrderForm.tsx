"use client";

import { useState } from "react";

import { TabType } from "../../../types";
import { ToggleButtonGroup } from "../../common";

export const OrderForm = () => {
  const [activeTab, setActiveTab] = useState<TabType>("매수");

  return (
    <div className='flex w-full flex-col'>
      <ToggleButtonGroup activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='p-5'>
        <div className='flex w-full justify-between'>
          <p className='font-semibold'>주문가능</p>
          <div className='flex items-center gap-2'>
            <p className='font-bold'>0</p>
            <p className='text-xs font-semibold text-text-dark'>KRW</p>
          </div>
        </div>
      </div>
    </div>
  );
};
