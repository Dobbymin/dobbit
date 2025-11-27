import { rateColor, rateFormat } from "@/entities";
import { TableCell, TableRow, cn } from "@/shared";

import { useMarketInfo } from "../../../hooks";

type Props = {
  market: string;
  koreanName: string;
  tradePrice: number;
  changeRate: number;
  signedChangePrice: number;
};

export const MarketInfoTable = ({ market, koreanName, tradePrice, changeRate, signedChangePrice }: Props) => {
  const { isActive, onClickMarketInfo } = useMarketInfo({ market });

  return (
    <TableRow
      key={market}
      onClick={() => onClickMarketInfo({ market, koreanName, tradePrice, changeRate, signedChangePrice })}
      className={cn(
        "cursor-pointer border-l-2 border-transparent transition-colors hover:bg-white/5",
        isActive ? "border-l-primary bg-white/5" : "border-l-transparent",
      )}
    >
      <TableCell className='flex flex-col font-medium'>
        <p className={cn("font-sans text-xs font-semibold", isActive ? "text-primary" : "text-white")}>{koreanName}</p>
        <p className='font-roboto text-[10px] font-light text-text-muted-dark'>{market}</p>
      </TableCell>
      <TableCell className={cn(rateColor(changeRate), "text-xs")}>
        {Number(tradePrice).toLocaleString("ko-KR")}
      </TableCell>
      <TableCell className={cn(rateColor(changeRate), "font-roboto text-xs")}>{rateFormat(changeRate)}</TableCell>
    </TableRow>
  );
};
