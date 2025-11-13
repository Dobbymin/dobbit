import { ChartSection, CoinInfoSection, OrderSection } from "@/features";

export default function Home() {
  return (
    <div className='xl:max-w-9xl flex w-full max-w-7xl justify-center px-10'>
      <div className='w-[28%]'>
        <CoinInfoSection />
      </div>
      <div className='flex w-[72%] flex-col'>
        <ChartSection />
        <OrderSection />
      </div>
    </div>
  );
}
