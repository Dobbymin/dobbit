import { ChartControls, CoinChartDisplay, CoinTitle } from "../components";

export const ChartSection = () => {
  return (
    <section className='flex w-full flex-col p-4'>
      <CoinTitle />
      <ChartControls />
      <CoinChartDisplay />
    </section>
  );
};
