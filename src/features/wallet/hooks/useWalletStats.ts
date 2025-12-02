"use client";

import { useEffect, useMemo } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createClient as createSupabaseBrowserClient } from "@/shared/utils/supabase";

import { getWalletStatsAPI, updateWalletStatsAPI } from "../apis";
import { useWalletStore } from "../store";

/**
 * 지갑 통계를 실시간으로 관리하는 훅
 * 1. Supabase Realtime으로 wallet_stats 구독
 * 2. 시세 변동 시 프론트에서 계산하여 업데이트
 */
export const useWalletStats = () => {
  const queryClient = useQueryClient();

  // Store에서 필요한 값들 가져오기 (선택자 패턴)
  const wallets = useWalletStore((state) => state.wallets);
  const tickerMap = useWalletStore((state) => state.tickerMap);
  const costBasisMap = useWalletStore((state) => state.costBasisMap);
  const getTotalEvaluation = useWalletStore((state) => state.getTotalEvaluation);
  const getTotalCoinEvaluation = useWalletStore((state) => state.getTotalCoinEvaluation);
  const getTotalPurchase = useWalletStore((state) => state.getTotalPurchase);
  const getTotalProfitLoss = useWalletStore((state) => state.getTotalProfitLoss);
  const getTotalProfitRate = useWalletStore((state) => state.getTotalProfitRate);

  // wallet_stats 조회
  const { refetch } = useQuery({
    queryKey: ["wallet-stats"],
    queryFn: getWalletStatsAPI,
    refetchInterval: false, // Realtime으로만 업데이트
  });

  // wallet_stats 업데이트 mutation
  const { mutate: updateStats } = useMutation({
    mutationFn: updateWalletStatsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet-stats"] });
    },
  });

  // 계산된 통계 값 (useMemo로 최적화)
  const calculatedStats = useMemo(() => {
    const krwWallet = wallets.find((w) => w.coin_id === "KRW");
    const heldKRW = krwWallet?.amount || 0;
    const totalCoinEval = getTotalCoinEvaluation();
    const totalAssets = heldKRW + totalCoinEval;
    const totalPurchase = getTotalPurchase();
    const totalEvaluation = getTotalEvaluation();
    const totalProfitLoss = getTotalProfitLoss();
    const totalProfitRate = getTotalProfitRate();

    return {
      held_krw: heldKRW,
      total_assets: totalAssets,
      total_purchase: totalPurchase,
      total_evaluation: totalEvaluation,
      total_profit_loss: totalProfitLoss,
      total_profit_rate: totalProfitRate,
    };
  }, [wallets, getTotalEvaluation, getTotalCoinEvaluation, getTotalPurchase, getTotalProfitLoss, getTotalProfitRate]);

  // 시세 변동 시 통계 업데이트 (debounce 없이 즉시)
  useEffect(() => {
    // tickerMap이 업데이트되고 wallets가 있을 때만 실행
    if (Object.keys(tickerMap).length > 0 && wallets.length > 0) {
      updateStats(calculatedStats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickerMap]); // tickerMap 변경 시에만 실행

  // Supabase Realtime 구독
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    let subscribed = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const setup = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      if (!userId || !subscribed) return;

      // wallet_stats 테이블 구독
      channel = supabase
        .channel(`wallet-stats-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "wallet_stats",
            filter: `user_id=eq.${userId}`,
          },
          () => {
            // 변경 감지 시 refetch
            refetch();
          },
        )
        .subscribe();
    };

    setup();

    return () => {
      subscribed = false;
      channel?.unsubscribe();
    };
  }, [refetch]);

  return {
    stats: calculatedStats, // 항상 계산된 최신 값 반환
    isLoaded: Object.keys(costBasisMap).length > 0,
  };
};
