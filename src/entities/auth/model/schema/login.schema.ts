import { z } from "zod";

export const loginSchema = z.object({
  userId: z
    .string()
    .min(1, "아이디를 입력해주세요.")
    .regex(/^[a-zA-Z0-9._-]+$/, "아이디는 영문, 숫자, ., _, - 만 사용 가능합니다."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
