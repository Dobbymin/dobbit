"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/shared";
import { User } from "@supabase/supabase-js";

export const useSupabaseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};
