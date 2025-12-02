import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared";

import { useAssetList, useRealtimeWallet } from "../hooks";

export const HeldAssetsListSection = () => {
  // 실시간 지갑 데이터 구독
  useRealtimeWallet();

  // 보유 자산 목록 데이터 가져오기
  const assetList = useAssetList();

  return (
    <section className='mt-6'>
      <h2 className='mb-4 text-lg font-semibold'>보유자산 목록</h2>
      <Table className='w-full bg-surface-dark/20'>
        <TableHeader>
          <TableRow className='border-b border-text-muted-dark/20'>
            <TableHead className='text-center text-white'>보유자산</TableHead>
            <TableHead className='text-center text-white'>보유수량</TableHead>
            <TableHead className='text-center text-white'>매수금액</TableHead>
            <TableHead className='text-center text-white'>평가금액</TableHead>
            <TableHead className='text-center text-white'>평가손익(%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assetList.map((asset, index) => (
            <TableRow className='border-b border-text-muted-dark/20' key={index}>
              <TableCell className='text-left text-white'>
                <div className='flex flex-col items-start gap-1'>
                  <p className='font-semibold'>{asset.name}</p>
                  <p className='text-sm font-light text-gray-400'>{asset.symbol}</p>
                </div>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center justify-end gap-1 text-white'>
                  <p>{asset.quantity}</p>
                  <p className='text-xs font-semibold text-gray-400'>{asset.symbol}</p>
                </div>
              </TableCell>
              <TableCell className='text-right text-white'>
                <div className='flex items-center justify-end gap-1'>
                  <p>{asset.buyPrice}</p>
                  <p className='text-xs font-semibold text-gray-400'>KRW</p>
                </div>
              </TableCell>
              <TableCell className='text-right text-white'>
                <div className='flex items-center justify-end gap-1'>
                  <p>{asset.currentPrice}</p>
                  <p className='text-xs font-semibold text-gray-400'>KRW</p>
                </div>
              </TableCell>
              <TableCell className={`text-right ${asset.isProfit ? "text-increase" : "text-decrease"} `}>
                <div className='flex flex-col items-end gap-1'>
                  <div className='flex items-center gap-2'>
                    <p>{asset.profitRate}</p>
                    <p className='text-sm font-semibold text-gray-400'>%</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm'>{asset.profitAmount}</p>
                    <p className='text-xs font-semibold text-gray-400'>KRW</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
