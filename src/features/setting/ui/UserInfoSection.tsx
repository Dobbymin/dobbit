"use client";

import { Button, Label } from "@/shared";

import { useUserInfo } from "../hooks";
import { formattedDate } from "../utils";

export const UserInfoSection = () => {
  const { userEmail, userNickname, lastUpdated } = useUserInfo();

  const formattedLastUpdated = formattedDate(lastUpdated || "");

  return (
    <section className='flex w-full flex-col items-start justify-center gap-6 bg-surface-dark p-10'>
      <div className='flex items-center gap-2'>
        <Label className='text-md text-text-primary w-16'>이메일</Label>
        <div className='text-text-muted flex h-10 min-w-70 items-center rounded-md bg-background px-3 py-2 text-sm'>
          {userEmail}
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Label className='text-md text-text-primary w-16'>닉네임</Label>
        <div className='flex items-center gap-4'>
          <div className='text-text-primary flex h-10 min-w-70 items-center rounded-md bg-background px-3 py-2 text-sm'>
            {userNickname}
          </div>
          <Button variant='outline' className='h-10'>
            수정
          </Button>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Label className='text-text-primary w-20'>마지막 접속일</Label>
        <div className='bg-surface-light/30 text-text-muted flex h-10 min-w-70 items-center rounded-md px-3 py-2 text-sm'>
          {formattedLastUpdated}
        </div>
      </div>
    </section>
  );
};
