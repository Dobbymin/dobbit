"use client";

import { useEffect, useMemo } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getTickerAPI } from "@/features/home/apis";

import { createClient as createSupabaseBrowserClient } from "@/shared/utils/supabase";

import { getTradesAPI } from "../apis/trades.api";
import { WALLET_KEYS } from "../constants";
import { useWalletStore } from "../store";
import { computeCostBasis } from "../utils/aggregate-trades";

import { useGetUserBalance } from "./useGetUserBalance";

/**
 * 지갑과 시세를 실시간으로 동기화하는 hook
 */
export const useRealtimeWallet = () => {
  const { setWallets, setTickerMap, setCostBasisMap } = useWalletStore();
  const queryClient = useQueryClient();

  // 지갑 정보 조회
  const { data: walletData, refetch: refetchWallet } = useGetUserBalance();

  // 지갑에 있는 모든 코인의 마켓 ID 추출 (KRW 제외) - 문자열로 변환
  const marketIds = useMemo(() => {
    if (!walletData) return "";
    return walletData
      .filter((w) => w.coin_id !== "KRW")
      .map((w) => w.coin_id)
      .join(",");
  }, [walletData]);

  // 실시간 시세 조회 (1초마다)
  const { data: tickerData } = useQuery({
    queryKey: ["ticker", marketIds],
    queryFn: () => getTickerAPI(marketIds),
    refetchInterval: 1000,
    enabled: !!marketIds, // marketIds가 있을 때만 실행
  });

  // 거래 내역 조회 (1초마다 - 주문 시 즉시 반영)
  const { data: tradesData } = useQuery({
    queryKey: ["trades"],
    queryFn: () => getTradesAPI(),
    refetchInterval: 1000,
  });

  // 지갑 데이터를 store에 동기화
  useEffect(() => {
    if (walletData) {
      setWallets(walletData);
    }
  }, [walletData, setWallets]);

  // 시세 데이터를 store에 동기화
  useEffect(() => {
    if (tickerData?.data) {
      const map: Record<string, (typeof tickerData.data)[0]> = {};
      tickerData.data.forEach((ticker) => {
        map[ticker.market] = ticker;
      });
      setTickerMap(map);
    }
  }, [tickerData, setTickerMap]);

  // 거래내역을 평균매수가/원가 맵으로 변환하여 store 동기화
  useEffect(() => {
    if (tradesData?.data) {
      const map = computeCostBasis(tradesData.data);
      setCostBasisMap(map);
    }
  }, [tradesData, setCostBasisMap]);

  // Supabase Realtime 구독: wallet 및 trade 테이블 변경 시 즉시 반영
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    let subscribed = true;
    let walletChannel: ReturnType<typeof supabase.channel> | null = null;
    let tradeChannel: ReturnType<typeof supabase.channel> | null = null;

    const setup = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      if (!userId || !subscribed) return;

      // wallet 테이블 구독
      walletChannel = supabase
        .channel(`wallet-changes-${userId}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "wallet", filter: `user_id=eq.${userId}` },
          () => {
            // 변경 감지 시 모든 지갑 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: WALLET_KEYS.balance.all });
            refetchWallet();
          },
        )
        .subscribe();

      // trade 테이블 구독 (거래 발생 시 지갑 데이터도 갱신)
      tradeChannel = supabase
        .channel(`trade-changes-${userId}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "trade", filter: `user_id=eq.${userId}` },
          () => {
            // 거래 발생 시 지갑 및 거래 내역 갱신
            queryClient.invalidateQueries({ queryKey: WALLET_KEYS.balance.all });
            queryClient.invalidateQueries({ queryKey: ["trades"] });
            refetchWallet();
          },
        )
        .subscribe();
    };

    setup();

    return () => {
      subscribed = false;
      walletChannel?.unsubscribe();
      tradeChannel?.unsubscribe();
    };
  }, [refetchWallet, queryClient]);

  return {
    wallets: walletData || [],
    refetchWallet,
  };
};
