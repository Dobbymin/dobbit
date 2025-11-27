import { MarketInfoType, useGetMarket, useSetMarket } from "@/entities";

type Props = {
  market: string;
};

export const useMarketInfo = ({ market }: Props) => {
  const { market: currentMarket } = useGetMarket();

  const setMarket = useSetMarket();

  const isActive = currentMarket === market;

  const onClickMarketInfo = (ticker: MarketInfoType) => {
    setMarket({
      market: ticker.market,
      tradePrice: ticker.tradePrice,
      changeRate: ticker.changeRate,
      koreanName: ticker.koreanName,
    });
  };

  return { isActive, onClickMarketInfo };
};
