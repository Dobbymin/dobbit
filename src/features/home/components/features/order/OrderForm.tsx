"use client";

import { useEffect, useState } from "react";

import { OrderSchemaType, orderSchema, tradeAPI, useGetMarket } from "@/entities";
import { Button, Form } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getWalletAPI } from "@/features/wallet/apis";

import { getTickerAPI } from "../../../apis";
import { TabType } from "../../../types";
import { AmountField, PriceField, ToggleButtonGroup, TotalField } from "../../common";

export const OrderForm = () => {
  const { market } = useGetMarket();
  const [activeTab, setActiveTab] = useState<TabType>("매수");

  // 실시간 시세 조회 (1초마다)
  const { data: tickerData } = useQuery({
    queryKey: ["ticker", market],
    queryFn: () => getTickerAPI(market),
    refetchInterval: 1000, // 1초마다 갱신
    enabled: !!market,
  });

  const currentPrice = tickerData?.data?.[0]?.trade_price || 0;

  // 지갑 정보 조회
  const { data: walletData, refetch: refetchWallet } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWalletAPI(),
  });

  // KRW 잔고와 선택된 코인 잔고 계산
  const krwBalance = walletData?.data?.find((w) => w.coin_id === "KRW")?.amount || 0;
  const coinBalance = walletData?.data?.find((w) => w.coin_id === market)?.amount || 0;

  const form = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      price: 0,
      amount: 0,
      total: 0,
    },
  });

  // 실시간 시세가 변경되면 가격 필드 업데이트
  useEffect(() => {
    if (currentPrice > 0) {
      form.setValue("price", currentPrice);
    }
  }, [currentPrice, form]);

  // 가격 변경 핸들러: 가격 × 수량 = 총액
  const handlePriceChange = (value: number) => {
    const amount = form.getValues("amount");
    const calculatedTotal = value * amount;
    form.setValue("total", calculatedTotal);
  };

  // 수량 변경 핸들러: 가격 × 수량 = 총액
  const handleAmountChange = (value: number) => {
    const price = form.getValues("price");
    const calculatedTotal = price * value;
    form.setValue("total", calculatedTotal);
  };

  // 총액 변경 핸들러: 총액 ÷ 가격 = 수량
  const handleTotalChange = (value: number) => {
    const price = form.getValues("price");
    if (price > 0) {
      const calculatedAmount = value / price;
      form.setValue("amount", calculatedAmount);
    }
  };

  // 초기화 핸들러
  const handleReset = () => {
    form.reset({
      price: 0,
      amount: 0,
      total: 0,
    });
  };

  const onSuccess = () => {
    toast.success("주문이 완료되었습니다.");
    handleReset();
    refetchWallet(); // 지갑 정보 재조회
  };

  const { mutate: tradeMutate, isPending } = useMutation({
    mutationFn: async (data: OrderSchemaType) => {
      const response = await tradeAPI({
        coin_id: market,
        price: data.price,
        amount: data.amount,
        trade_type: activeTab === "매수" ? "buy" : "sell",
      });
      return response;
    },
    onSuccess,
    onError: (error) => {
      toast.error(`주문 실패: ${error.message}`);
    },
  });

  const onSubmit = (data: OrderSchemaType) => {
    tradeMutate(data);
  };

  return (
    <div className='flex w-full flex-col'>
      <ToggleButtonGroup activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='w-full p-5'>
        <div className='flex w-full justify-between'>
          <p className='font-semibold'>주문가능</p>
          <div className='flex items-center gap-2'>
            <p className='font-bold'>{activeTab === "매수" ? krwBalance.toLocaleString() : coinBalance.toFixed(8)}</p>
            <p className='text-xs font-semibold text-text-dark'>
              {activeTab === "매수" ? "KRW" : market.includes("/") ? market.split("/")[0] : market}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form className='flex w-full flex-col gap-3 py-6' onSubmit={(e) => e.preventDefault()}>
            <div className='grid gap-4'>
              <PriceField onValueChange={handlePriceChange} />
              <AmountField
                coinInfo={market.includes("/") ? market.split("/")[0] : market}
                onValueChange={handleAmountChange}
              />
              <TotalField onValueChange={handleTotalChange} />
            </div>
            <div className='flex w-full gap-2 py-5'>
              <Button
                type='button'
                variant='outline'
                className='h-10 w-[25%] border-none bg-gray-500'
                onClick={handleReset}
              >
                <RotateCw />
                초기화
              </Button>
              <Button
                type='submit'
                onClick={form.handleSubmit(onSubmit)}
                variant='secondary'
                className='h-10 w-[73%]'
                disabled={isPending}
              >
                {isPending ? "처리 중..." : "주문하기"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
