"use client";

import { Button, Input, Label, Skeleton, Spinner } from "@/shared";

import { useChangeNickname, useUserInfo } from "../../hooks";

export const NicknameField = () => {
  const { userNickname, isLoaded } = useUserInfo();

  const { fieldState, inputValue, onChangeNickname, onClickEditButton, isPending } = useChangeNickname({
    userNickname,
  });

  return (
    <div className='flex items-center gap-2'>
      <Label className='text-md text-text-primary w-16'>닉네임</Label>
      <div className='flex items-center gap-4'>
        {fieldState === "edit" ? (
          <Input
            className='min-w-70'
            value={inputValue}
            onChange={onChangeNickname}
            disabled={isPending}
            placeholder='닉네임을 입력하세요'
          />
        ) : (
          <div className='flex h-10 min-w-70 items-center rounded-md bg-background px-3 py-2'>
            {!isLoaded ? <Skeleton className='h-5 w-32' /> : <p className='text-text-muted text-sm'>{userNickname}</p>}
          </div>
        )}
        <Button onClick={onClickEditButton} variant='outline' className='h-10' disabled={isPending}>
          {isPending ? <Spinner /> : fieldState === "edit" ? "저장" : "수정"}
        </Button>
      </div>
    </div>
  );
};
