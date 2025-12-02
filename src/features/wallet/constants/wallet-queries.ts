export const WALLET_KEYS = {
  balance: {
    all: ["user-balance"],
    krw: () => [...WALLET_KEYS.balance.all, "krw"],
    coin: (coinId: string) => [...WALLET_KEYS.balance.all, "coin", coinId],
  },
};
