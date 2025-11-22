import { APIResponse } from "@/shared";

export interface ChangeNicknameParams {
  nickname: string;
}

export type ChangeNicknameResponse = APIResponse<{
  nickname: string;
}>;

export const changeNicknameAPI = async ({ nickname }: ChangeNicknameParams): Promise<ChangeNicknameResponse> => {
  const response = await fetch("/api/user/nickname", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "닉네임 변경에 실패했습니다.");
  }

  return response.json();
};
