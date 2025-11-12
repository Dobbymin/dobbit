"use client";

import Link from "next/link";

import { useSupabaseUser } from "@/entities";
import { UserRound, Wallet } from "lucide-react";

import { ROUTER_PATH } from "../../../constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../../ui";

export const LoginButton = () => {
  const { user, isAuthenticated, isLoading } = useSupabaseUser();

  // Supabase user의 avatar URL 또는 빈 문자열
  const userAvatarUrl = user?.user_metadata?.avatar_url || "";

  // 로딩 중이거나 인증된 경우 Wallet 버튼과 Avatar 표시
  if (isLoading || isAuthenticated) {
    return (
      <div className='flex items-center justify-end gap-4'>
        <Link
          href={ROUTER_PATH.WALLET}
          className='rounded-md bg-surface-dark px-3 py-2 text-text-muted-dark hover:bg-white/10 hover:text-white'
        >
          <div className='flex items-center gap-2'>
            <Wallet className='size-5' />
            <p className='text-sm font-semibold'>Wallet</p>
          </div>
        </Link>
        <Select>
          <SelectTrigger className='border-0 bg-transparent p-0 shadow-none ring-0 outline-none hover:bg-transparent focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:ring-0 [&>svg]:hidden'>
            <Avatar>
              {!isLoading && <AvatarImage src={userAvatarUrl} alt='User Avatar' />}
              <AvatarFallback>
                <UserRound className='mt-2 size-8' fill='#e0e0e0' />
              </AvatarFallback>
            </Avatar>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='logout'>Logout</SelectItem>
              <SelectItem value='setting'>Setting</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }

  // 로그인하지 않은 경우 Login 링크 표시
  return (
    <div className='flex items-center justify-end gap-4'>
      <Link href={ROUTER_PATH.LOGIN}>Login</Link>
    </div>
  );
};
