export const BTCInfoAPI = async () => {
  const response = await fetch("/api/market/BTC");

  if (!response.ok) {
    throw new Error("Failed to fetch BTC info");
  }
  const { data } = await response.json();
  return data[0];
};
