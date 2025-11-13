"use client";

import { useState } from "react";

import { OrderSchemaType, orderSchema, tradeAPI } from "@/entities";
import { Button, Form } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TabType } from "../../../types";
import { AmountField, PriceField, ToggleButtonGroup, TotalField } from "../../common";

export const OrderForm = () => {
  const [activeTab, setActiveTab] = useState<TabType>("매수");

  const form = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      price: 0,
      amount: 0,
      total: 0,
    },
  });

  const onSuccess = () => {
    toast.success("주문이 완료되었습니다.");

    form.reset();
  };

  const { mutate: tradeMutate } = useMutation({
    mutationFn: async (data: OrderSchemaType) => {
      const response = await tradeAPI({
        coin_id: "KRW-WAXP",
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
            <p className='font-bold'>0</p>
            <p className='text-xs font-semibold text-text-dark'>KRW</p>
          </div>
        </div>
        <Form {...form}>
          <form className='flex w-full flex-col gap-3 py-6' onSubmit={(e) => e.preventDefault()}>
            <div className='grid gap-4'>
              <PriceField />
              <AmountField />
              <TotalField />
            </div>
            <div className='flex w-full gap-2 py-5'>
              <Button variant='outline' className='h-10 w-[25%] border-none bg-gray-500'>
                <RotateCw />
                초기화
              </Button>
              <Button type='submit' onClick={form.handleSubmit(onSubmit)} variant='secondary' className='h-10 w-[73%]'>
                주문하기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
