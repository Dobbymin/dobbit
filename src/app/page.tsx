import { ChartSection, CoinInfoSection, OrderSection } from "@/features";

export default function Home() {
  return (
    <main className='flex flex-1 overflow-hidden'>
      <CoinInfoSection />
      <ChartSection />
      <OrderSection />
    </main>
  );
}
