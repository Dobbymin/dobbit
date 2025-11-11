"use client";

import Link from "next/link";

import { useGetAuth } from "@/entities";
import { UserRound, Wallet } from "lucide-react";

import { ROUTER_PATH } from "@/shared/constants";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui";

export const LoginButton = () => {
  const userAvatarUrl = ""; // Replace with actual user avatar URL when available

  const userToken = useGetAuth();
  const isLogin = userToken !== null;

  return (
    <div className='flex items-center justify-end gap-4'>
      {isLogin ? (
        <>
          <Link
            href={ROUTER_PATH.WALLET}
            className='rounded-md bg-surface-dark px-3 py-2 text-text-muted-dark hover:bg-white/10 hover:text-white'
          >
            <div className='flex items-center gap-2'>
              <Wallet className='size-5' />
              <p className='text-sm font-semibold'>Wallet</p>
            </div>
          </Link>
          <Avatar>
            {userAvatarUrl ? (
              <AvatarImage src={userAvatarUrl} alt='User Avatar' />
            ) : (
              <AvatarFallback>
                <UserRound className='mt-2 size-8' fill='#e0e0e0' />
              </AvatarFallback>
            )}
          </Avatar>
        </>
      ) : (
        <Link href={ROUTER_PATH.LOGIN}>Login</Link>
      )}
    </div>
  );
};
