export const WALLET_KEYS = {
  balance: {
    all: ["user-balance"] as const,
    krw: () => ["user-balance", "krw"] as const,
    coin: (coinId: string) => ["user-balance", "coin", coinId] as const,
  },
};
