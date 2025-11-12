import { useGetSession, useIsSessionLoaded } from "@/shared";

import { useGetAuth } from "./useAuth";

/**
 * 로그인 여부를 판단하는 훅
 * - localStorage의 accessToken 존재 여부
 * - Supabase 세션 존재 여부
 * 둘 중 하나라도 있으면 로그인 상태로 판단
 */
export const useIsAuth = () => {
  const accessToken = useGetAuth();
  const session = useGetSession();
  const isSessionLoaded = useIsSessionLoaded();

  // 세션이 로드되지 않았으면 로딩 중
  const isLoading = !isSessionLoaded;

  // accessToken이나 session이 있으면 인증된 상태
  const isAuthenticated = !!(accessToken || session?.access_token);

  return {
    isAuthenticated,
    isLoading,
  };
};
