"use client";

import { Button, Label } from "@/shared";

import { useUserInfo } from "../../hooks";

export const NicknameField = () => {
  const { userNickname } = useUserInfo();

  return (
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
  );
};
