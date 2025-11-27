export const toDisplayMarket = (upbitMarket: string): string => {
  if (!upbitMarket) return upbitMarket;
  if (upbitMarket.includes("-")) {
    const [quote, base] = upbitMarket.split("-");
    return `${base}/${quote}`;
  }
  return upbitMarket;
};

export const toUpbitMarket = (displayMarket: string): string => {
  if (!displayMarket) return displayMarket;
  if (displayMarket.includes("/")) {
    const [base, quote] = displayMarket.split("/");
    return `${quote}-${base}`;
  }
  return displayMarket;
};

export const toUpbitMarketsCSV = (displayMarketsCSV: string): string => {
  if (!displayMarketsCSV) return "";
  return displayMarketsCSV
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean)
    .map(toUpbitMarket)
    .join(",");
};
