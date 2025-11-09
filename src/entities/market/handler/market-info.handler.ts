import { marketAllAPI, tickerAPI } from "../model";

export const marketInfoHandler = async () => {
  const marketData = await marketAllAPI();

  const krwMarketMap = new Map<string, { korean_name: string }>();
  marketData.forEach((item) => {
    if (item.market.startsWith("KRW-")) {
      krwMarketMap.set(item.market, { korean_name: item.korean_name });
    }
  });

  const krwMarketCodes = Array.from(krwMarketMap.keys());
  if (krwMarketCodes.length === 0) {
    return [];
  }

  const tickerData = await tickerAPI(krwMarketCodes);

  const result = tickerData.map((ticker) => {
    const marketInfo = krwMarketMap.get(ticker.market);

    return {
      market: ticker.market,
      koreanName: marketInfo?.korean_name || "",
      tradePrice: ticker.trade_price,
      changeRate: parseFloat((ticker.signed_change_rate * 100).toFixed(2)), // 퍼센트로 변환 & 소수 둘째자리
    };
  });

  return result;
};
