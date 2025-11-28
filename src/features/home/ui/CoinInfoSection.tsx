"use client";

import { useCallback, useState } from "react";

import { CoinInfoTable, CoinSearchInput } from "../components";

export const CoinInfoSection = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearchKeyword(value);
  }, []);

  return (
    <aside className='flex flex-col border-r border-white/10 bg-surface-dark/20'>
      <CoinSearchInput onSearch={handleSearch} />
      <CoinInfoTable searchKeyword={searchKeyword} />
    </aside>
  );
};
