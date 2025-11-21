"use client";

import { Avatar, AvatarFallback, AvatarImage, Button, Label, useGetSession } from "@/shared";
import { Camera, UserRound } from "lucide-react";

export default function SettingPage() {
  const session = useGetSession();

  const userAvatarUrl = session?.user?.user_metadata?.avatar_url || "";
  const userNickname = session?.user?.user_metadata?.nickname || "Unknown";
  const userEmail = session?.user?.email || "";
  const lastUpdated = session?.user?.updated_at || "";

  const year = lastUpdated ? new Date(lastUpdated).getFullYear() : "";
  const month = lastUpdated ? String(new Date(lastUpdated).getMonth() + 1).padStart(2, "0") : "";
  const day = lastUpdated ? String(new Date(lastUpdated).getDate()).padStart(2, "0") : "";

  const Hour = lastUpdated ? String(new Date(lastUpdated).getHours()).padStart(2, "0") : "";
  const Minutes = lastUpdated ? String(new Date(lastUpdated).getMinutes()).padStart(2, "0") : "";
  const Seconds = lastUpdated ? String(new Date(lastUpdated).getSeconds()).padStart(2, "0") : "";

  const formattedLastUpdated = lastUpdated ? `${year}년 ${month}월 ${day}일 ${Hour}:${Minutes}:${Seconds}` : "N/A";

  return (
    <div className='flex w-full max-w-4xl flex-col gap-8 px-5 py-10'>
      <h1 className='text-2xl font-bold text-white'>프로필 설정</h1>

      <div className='flex flex-col gap-8 md:flex-row md:items-start'>
        <section className='flex flex-col items-center gap-4 bg-surface-dark p-10'>
          <div className='relative'>
            <Avatar className='border-surface-light size-32 border-2'>
              <AvatarImage src={userAvatarUrl} alt='User Avatar' className='object-cover' />
              <AvatarFallback className='bg-surface-light'>
                <UserRound className='text-text-muted size-16' />
              </AvatarFallback>
            </Avatar>
            <Button
              size='icon'
              variant='secondary'
              className='hover:bg-surface-light absolute right-0 bottom-0 size-10 rounded-full shadow-lg'
            >
              <Camera className='size-5' />
            </Button>
          </div>
          <p className='text-text-muted text-sm'>프로필 사진 변경</p>
        </section>

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
      </div>
    </div>
  );
}
