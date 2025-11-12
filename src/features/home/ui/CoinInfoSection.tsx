import { CoinInfoTable, CoinSearchInput } from "../components";

export const CoinInfoSection = () => {
  return (
    <aside className='flex flex-col border-r border-white/10 bg-surface-dark/20'>
      <CoinSearchInput />
      <CoinInfoTable />
    </aside>
  );
};
