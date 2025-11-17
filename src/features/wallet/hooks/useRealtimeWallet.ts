"use client";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { getTickerAPI } from "@/features/home/apis";

import { getWalletAPI } from "../apis";
import { getTradesAPI } from "../apis/trades.api";
import { useWalletStore } from "../store";
import { computeCostBasis } from "../utils/aggregate-trades";
import { createClient as createSupabaseBrowserClient } from "@/shared/utils/supabase";

/**
 * 지갑과 시세를 실시간으로 동기화하는 hook
 */
export const useRealtimeWallet = () => {
  const { setWallets, setTickerMap, setCostBasisMap } = useWalletStore();

  // 지갑 정보 조회
  const { data: walletData, refetch: refetchWallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWalletAPI(),
  });

  // 지갑에 있는 모든 코인의 마켓 ID 추출 (KRW 제외)
  const markets = walletData?.data
    ?.filter((w) => w.coin_id !== "KRW")
    .map((w) => w.coin_id)
    .join(",");

  // 실시간 시세 조회 (1초마다)
  const { data: tickerData } = useQuery({
    queryKey: ["ticker", markets],
    queryFn: () => getTickerAPI(markets || ""),
    refetchInterval: 1000,
    enabled: !!markets, // markets가 있을 때만 실행
  });

  // 거래 내역 조회 (1초마다 - 주문 시 즉시 반영)
  const { data: tradesData } = useQuery({
    queryKey: ["trades"],
    queryFn: () => getTradesAPI(),
    refetchInterval: 1000,
  });

  // 지갑 데이터를 store에 동기화
  useEffect(() => {
    if (walletData?.data) {
      setWallets(walletData.data);
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

  // Supabase Realtime 구독: wallet 테이블의 사용자 레코드 변경 시 즉시 반영
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    let subscribed = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setup = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      if (!userId || !subscribed) return;

      channel = supabase
        .channel(`wallet-changes-${userId}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "wallet", filter: `user_id=eq.${userId}` },
          () => {
            // 변경 감지 시 최신 지갑 데이터로 갱신
            refetchWallet();
          },
        )
        .subscribe();
    };

    setup();

    return () => {
      subscribed = false;
      channel?.unsubscribe();
    };
  }, [refetchWallet]);

  return {
    wallets: walletData?.data || [],
    refetchWallet,
  };
};
