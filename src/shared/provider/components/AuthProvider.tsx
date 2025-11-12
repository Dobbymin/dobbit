"use client";

import { useEffect } from "react";

import { useClearAuth, useSetAuth } from "@/entities";

import { useSetSession } from "../../hooks";
import { createClient } from "../../utils";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const supabase = createClient();
  const setSession = useSetSession();
  const setAccessToken = useSetAuth();
  const clearAccessToken = useClearAuth();

  useEffect(() => {
    // 초기 세션 로드
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      // Supabase 세션이 있으면 localStorage에도 토큰 저장
      if (session?.access_token) {
        setAccessToken(session.access_token);
      } else {
        clearAccessToken();
      }
    };

    initSession();

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      // 세션이 있으면 localStorage에 토큰 저장, 없으면 제거
      if (session?.access_token) {
        setAccessToken(session.access_token);
      } else {
        clearAccessToken();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, setSession, setAccessToken, clearAccessToken]);

  return <div>{children}</div>;
};
