import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared";
import { Search } from "lucide-react";

export const CoinSearchInput = () => {
  return (
    <div className='p-4'>
      <InputGroup className='form-input h-10 w-full rounded-lg border-none bg-surface-dark text-sm text-text-dark placeholder:text-text-muted-dark focus:ring-2 focus:ring-primary/50 focus:outline-0'>
        <InputGroupInput placeholder='코인명 / 심볼 검색' />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
