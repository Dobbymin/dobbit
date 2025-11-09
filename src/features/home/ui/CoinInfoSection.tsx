import { CoinInfoTable, CoinSearchInput } from "../components";

export const CoinInfoSection = () => {
  return (
    <aside className='flex w-[30%] min-w-64 flex-col border-r border-white/10 bg-surface-dark/20'>
      <CoinSearchInput />
      <CoinInfoTable />
    </aside>
  );
};
