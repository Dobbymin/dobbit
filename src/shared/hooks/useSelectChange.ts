"use client";

import { useRouter } from "next/navigation";

import { logoutAPI, useClearAuth } from "@/entities";
import { toast } from "sonner";

import { ROUTER_PATH } from "../constants";

export const useSelectChange = () => {
  const router = useRouter();
  const clearAccessToken = useClearAuth();

  const handleSelectChange = async (value: string) => {
    if (value === "logout") {
      try {
        await logoutAPI();
        clearAccessToken(); // localStorage에서 accessToken 제거

        toast.success("로그아웃 되었습니다.");

        router.push(ROUTER_PATH.LOGIN);
      } catch (error) {
        toast.error("로그아웃에 실패했습니다.");

        console.error("로그아웃 에러:", error);
      }
    } else if (value === "setting") {
      router.push(ROUTER_PATH.SETTING);
    }
  };

  return handleSelectChange;
};
