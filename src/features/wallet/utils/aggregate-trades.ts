import { TradeEntity } from "@/entities/market";

export type CostBasis = {
  avgPrice: number; // 평균 매수가 (잔고 기준 이동평균)
  quantity: number; // 현재 보유 수량
  totalCost: number; // 잔고 기준 총 매수 금액 (avgPrice * quantity)
};

/**
 * 이동평균법으로 평균 매수가를 계산합니다.
 * - buy: (기존총원가 + 매수금액) / (기존수량 + 매수수량)
 * - sell: 수량만 감소, 평균단가는 유지. 총원가는 avgPrice * 남은수량 으로 조정
 */
export function computeCostBasis(trades: TradeEntity[]): Record<string, CostBasis> {
  const map: Record<string, CostBasis> = {};

  // 시간 순으로 정렬 (오래된 거래 먼저)
  const sorted = [...trades].sort((a, b) => new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime());

  for (const t of sorted) {
    const key = t.coin_id;
    const price = Number(t.price);
    const qty = Number(t.amount);
    const type = t.trade_type as "buy" | "sell";

    if (!map[key]) {
      map[key] = { avgPrice: 0, quantity: 0, totalCost: 0 };
    }

    const entry = map[key];

    if (type === "buy") {
      const newTotalCost = entry.totalCost + price * qty;
      const newQty = entry.quantity + qty;
      const newAvg = newQty > 0 ? newTotalCost / newQty : 0;
      entry.avgPrice = newAvg;
      entry.quantity = newQty;
      entry.totalCost = newAvg * newQty; // 정규화
    } else if (type === "sell") {
      const newQty = entry.quantity - qty;
      const safeQty = Math.max(newQty, 0);
      // 평균단가는 유지, 총원가는 avg * 남은수량
      entry.quantity = safeQty;
      entry.totalCost = entry.avgPrice * safeQty;
      if (safeQty === 0) {
        entry.avgPrice = 0;
      }
    }
  }

  return map;
}
