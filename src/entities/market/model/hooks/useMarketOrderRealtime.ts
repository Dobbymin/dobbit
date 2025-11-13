"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/shared";

import { OrderbookUnit } from "../types";

export interface MarketOrderRealtimeData {
  market: string;
  orderbook_units: OrderbookUnit[];
  timestamp: number;
}

export const useMarketOrderRealtime = (market: string) => {
  const [data, setData] = useState<MarketOrderRealtimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // 초기 데이터 로드
    const fetchInitialData = async () => {
      try {
        const { data: marketData, error: fetchError } = await supabase
          .from("market_orders")
          .select("*")
          .eq("market", market)
          .single();

        if (fetchError) {
          if (fetchError.code !== "PGRST116") {
            // 데이터가 없는 경우가 아니라면 에러 처리
            throw fetchError;
          }
        } else if (marketData) {
          setData({
            market: marketData.market,
            orderbook_units: marketData.orderbook_units as OrderbookUnit[],
            timestamp: marketData.timestamp,
          });
        }
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Realtime 구독 설정
    const channel = supabase
      .channel(`market_orders:${market}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "market_orders",
          filter: `market=eq.${market}`,
        },
        (payload) => {
          console.log("Realtime update:", payload);

          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            const newData = payload.new as {
              market: string;
              orderbook_units: unknown;
              timestamp: number;
            };

            setData({
              market: newData.market,
              orderbook_units: newData.orderbook_units as OrderbookUnit[],
              timestamp: newData.timestamp,
            });
          }
        },
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [market]);

  return { data, isLoading, error };
};
