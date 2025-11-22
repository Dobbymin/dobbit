"use client";

import { useGetSession, useIsSessionLoaded } from "@/shared";

export const useUserInfo = () => {
  const session = useGetSession();
  const isLoaded = useIsSessionLoaded();

  const userAvatarUrl = session?.user?.user_metadata?.avatar_url || "";
  const userNickname = session?.user?.user_metadata?.nickname || "";
  const userEmail = session?.user?.email || "";
  const lastUpdated = session?.user?.updated_at || "";

  return { userAvatarUrl, userNickname, userEmail, lastUpdated, isLoaded };
};
