"use client";

import { useGetSession } from "@/shared";

export const useUserInfo = () => {
  const session = useGetSession();

  const userAvatarUrl = session?.user?.user_metadata?.avatar_url || "";
  const userNickname = session?.user?.user_metadata?.nickname || "Unknown";
  const userEmail = session?.user?.email || "";
  const lastUpdated = session?.user?.updated_at || "";

  return { userAvatarUrl, userNickname, userEmail, lastUpdated };
};
