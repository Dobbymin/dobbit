import { createClient } from "@/shared/utils/supabase/client";

type CreateProfileParams = {
  id: string; // auth.users id (uuid)
  email: string;
  userName: string; // 로그인 아이디를 사용자명으로 기본 설정
  nickname?: string; // 기본값: userName
  avatarUrl?: string | null; // 기본값: null
};

/**
 * 회원 가입 직후 profiles 테이블에 사용자 프로필을 생성합니다.
 * - id는 auth.users의 id와 동일하게 저장합니다.
 * - nickname은 전달되지 않으면 userName과 동일하게 저장합니다.
 */
export const createProfileAPI = async ({ id, email, userName, nickname, avatarUrl }: CreateProfileParams) => {
  const supabase = createClient();

  const payload = {
    id,
    email,
    user_name: userName,
    nickname: nickname ?? userName,
    avatar_url: avatarUrl ?? null,
  } satisfies {
    id: string;
    email: string;
    user_name: string;
    nickname: string;
    avatar_url: string | null;
  };

  const { data, error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" }).select("*").single();

  if (error) {
    throw new Error(`Create profile failed: ${error.message}`);
  }

  return data;
};
