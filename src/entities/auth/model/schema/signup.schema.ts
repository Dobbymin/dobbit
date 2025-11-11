import { z } from "zod";

export const signupSchema = z
  .object({
    userEmail: z
      .string()
      .min(1, "아이디를 입력해주세요.")
      .regex(/^[a-zA-Z0-9._-]+$/, "아이디는 영문, 숫자, ., _, - 만 사용 가능합니다."),
    password: z.string().min(6, "비밀번호를 6자 이상 입력해주세요."),
    confirmPassword: z.string().min(6, "비밀번호를 다시 입력해주세요."),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.nickname !== "", {
    message: "닉네임을 입력해주세요.",
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
