import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type CoinSelectProps = {
  value: string;
  onChange: (value: string) => void;
  markets: { market: string; korean_name: string; english_name: string }[];
};

export const CoinSelect = ({ value, onChange, markets }: CoinSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='코인 선택' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>KRW 마켓</SelectLabel>
          {markets.map((market) => (
            <SelectItem key={market.market} value={market.market}>
              {market.korean_name} ({market.market})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
