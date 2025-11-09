import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared";

import { marketAllAPI, tickerAPI } from "../../../apis";

export const CoinInfoTable = async () => {
  const marketData = await marketAllAPI();
  const marketList = marketData.map((item) => item.market);
  // console.log(marketData);
  const tickerData = await tickerAPI(marketList);
  return (
    <div className='flex-1 overflow-y-auto'>
      <Table>
        <TableHeader>
          <TableRow className='sticky top-0 border-none bg-surface-dark/30'>
            <TableHead className='text-text-muted-dark'>마켓</TableHead>
            <TableHead className='text-text-muted-dark'>가격</TableHead>
            <TableHead className='text-text-muted-dark'>24시간 변동률</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* <tr className='cursor-pointer border-l-2 border-primary bg-primary/10 hover:bg-primary/20'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>BTC/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>68,450.25</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-positive'>+2.15%</td>
          </tr>
          <tr className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
            <td className='px-4 py-3 font-medium whitespace-nowrap text-text-dark'>ETH/USD</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-text-dark'>3,550.78</td>
            <td className='px-4 py-3 text-right font-mono whitespace-nowrap text-positive'>+1.80%</td>
          </tr> */}
          {tickerData.map((ticker) => (
            <TableRow key={ticker.market} className='cursor-pointer border-l-2 border-transparent hover:bg-white/5'>
              <TableCell className='font-medium'>{ticker.market}</TableCell>
              <TableCell>{ticker.trade_price.toLocaleString()}</TableCell>
              <TableCell className={`${ticker.signed_change_rate >= 0 ? "text-positive" : "text-destructive"}`}>
                {(ticker.signed_change_rate * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
