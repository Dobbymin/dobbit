"use client";

import { Label, Skeleton } from "@/shared";

import { useUserInfo } from "../../hooks";
import { formattedDate } from "../../utils";

export const LastLoginField = () => {
  const { lastUpdated, isLoaded } = useUserInfo();

  const formattedLastUpdated = formattedDate(lastUpdated || "");

  return (
    <div className='flex items-center gap-4'>
      <Label className='text-text-primary w-20'>마지막 접속일</Label>
      <div className='bg-surface-light/30 flex h-10 min-w-70 items-center px-3 py-2'>
        {!isLoaded ? (
          <Skeleton className='h-5 w-32' />
        ) : (
          <p className='text-text-muted text-sm'>{formattedLastUpdated}</p>
        )}
      </div>
    </div>
  );
};
