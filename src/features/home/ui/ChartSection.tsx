import { ChartControls, CoinChartDisplay, CoinTitle } from "../components";

export const ChartSection = () => {
  return (
    <section className='flex w-[60%] flex-col'>
      <CoinTitle />
      <ChartControls />
      <CoinChartDisplay />
    </section>
  );
};
