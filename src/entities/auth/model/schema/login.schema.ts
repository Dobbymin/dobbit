import { z } from "zod";

export const loginSchema = z.object({
  userEmail: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
