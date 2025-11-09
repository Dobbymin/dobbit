import { marketAllAPI, tickerAPI } from "../model";

export const marketInfoHandler = async () => {
  const marketData = await marketAllAPI();

  const KRWmarketList = marketData
    .filter((item) => item.market.startsWith("KRW-"))
    .map((item) => ({
      market: item.market,
      korean_name: item.korean_name,
    }));
  // const marketName = KRWmarketList.map((item) => item.korean_name);

  // const marketList = KRWMarkets.map((item) => item.market, item.korean_name);

  const tickerData = await tickerAPI(KRWmarketList.map((item) => item.market));
  // const tickerData = await tickerAPI(["KRW-WAXP"]);

  const result = tickerData.map((ticker) => {
    const marketInfo = KRWmarketList.find((m) => m.market === ticker.market);

    return {
      market: ticker.market,
      koreanName: marketInfo?.korean_name || "",
      tradePrice: ticker.trade_price,
      changeRate: parseFloat((ticker.signed_change_rate * 100).toFixed(2)), // 퍼센트로 변환 & 소수 둘째자리
    };
  });

  return result;
};
