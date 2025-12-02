"use client";

import { useState } from "react";

import { depositAPI } from "@/entities";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
  queryClient,
} from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { WALLET_KEYS } from "../constants";

export const CashSection = () => {
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onSuccess = () => {
    toast.success("입금이 완료되었습니다!");
    setAmount("");
    setIsOpen(false);
    queryClient.invalidateQueries({
      queryKey: WALLET_KEYS.balance.krw(),
    });
  };

  const { mutate: deposit, isPending } = useMutation({
    mutationFn: (amount: number) => depositAPI(amount),
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: Error) => {
      toast.error(`입금 실패: ${error.message}`);
    },
  });

  const onClickDeposit = () => {
    const depositAmount = Number(amount);

    if (!amount || isNaN(depositAmount)) {
      toast.error("올바른 금액을 입력해주세요.");
      return;
    }

    if (depositAmount <= 0) {
      toast.error("0원보다 큰 금액을 입력해주세요.");
      return;
    }

    deposit(depositAmount);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onClickDeposit();
    }
  };

  return (
    <section className='flex w-full items-center justify-between bg-surface-dark/20 p-5'>
      <p className='text-lg'>가상의 현금을 입금해보아요.</p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className='h-10 w-30'>KRW입금</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>KRW입금</DialogTitle>
          <DialogDescription>원하는 금액을 입력해주세요.</DialogDescription>
          <Input
            type='number'
            placeholder='입금할 금액을 입력해주세요.'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isPending}
          />
          <Button className='mt-4 w-full' onClick={onClickDeposit} disabled={isPending}>
            {isPending ? "입금 중..." : "입금하기"}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};
