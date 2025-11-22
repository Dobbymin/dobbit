import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createClient } from "@/shared/utils/supabase";

import { changeNicknameAPI } from "../apis";

type Props = {
  userNickname: string;
};

export const useChangeNickname = ({ userNickname }: Props) => {
  const [fieldState, setFieldState] = useState<"view" | "edit">("view");
  const [inputValue, setInputValue] = useState(userNickname);
  const supabase = createClient();

  // userNickname이 변경되면 inputValue 동기화 (세션 새로고침 후)
  useEffect(() => {
    setInputValue(userNickname);
  }, [userNickname]);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const { mutate: changeNickname, isPending } = useMutation({
    mutationFn: () => changeNicknameAPI({ nickname: inputValue }),
    onError: (error: Error) => {
      toast.error(error.message);
      setInputValue(userNickname); // 에러 시 원래 값으로 복구
    },
    onSuccess: async () => {
      toast.success("닉네임이 변경되었습니다.");
      setFieldState("view");

      // Supabase 세션 강제 갱신 (AuthProvider가 감지하여 Zustand 스토어 업데이트)
      await supabase.auth.refreshSession();
    },
  });

  const onClickEditButton = () => {
    if (fieldState === "edit") {
      if (inputValue.trim() === userNickname) {
        setFieldState("view");
        return;
      }
      changeNickname();
    } else {
      setFieldState("edit");
    }
  };

  return {
    fieldState,
    inputValue,
    onChangeNickname,
    onClickEditButton,
    isPending,
  };
};
