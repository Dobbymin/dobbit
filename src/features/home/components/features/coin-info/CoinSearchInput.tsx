"use client";

import { useEffect, useState } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared";
import { Search } from "lucide-react";

type Props = {
  onSearch: (value: string) => void;
};

export const CoinSearchInput = ({ onSearch }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Debounce: 300ms 후에 검색어 전달
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, onSearch]);

  return (
    <div className='p-4'>
      <InputGroup className='form-input h-10 w-full rounded-lg border-none bg-surface-dark text-sm text-text-dark placeholder:text-text-muted-dark focus:ring-2 focus:ring-primary/50 focus:outline-0'>
        <InputGroupInput placeholder='코인명 / 심볼 검색' value={searchValue} onChange={onChangeSearch} />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
