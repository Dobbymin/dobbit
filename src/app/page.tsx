import { ChartSection, CoinInfoSection, OrderSection } from "@/features";

export default function Home() {
  return (
    <div className='flex w-full justify-center'>
      <CoinInfoSection />
      <ChartSection />
      <OrderSection />
    </div>
  );
}
