export const formattedMarketName = (market: string | undefined): string => {
  if (!market) {
    return "KRW-BTC"; // 기본값 설정
  }

  if (market.includes("/")) {
    const [coin, currency] = market.split("/");
    return `${currency}-${coin}`;
  }

  return market;
};
