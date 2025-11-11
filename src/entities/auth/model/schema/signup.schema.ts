import { z } from "zod";

export const signupSchema = z
  .object({
    userEmail: z.string().min(1, "이메일을 입력해주세요."),
    password: z.string().min(6, "비밀번호를 6자 이상 입력해주세요."),
    confirmPassword: z.string().min(6, "비밀번호를 다시 입력해주세요."),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
