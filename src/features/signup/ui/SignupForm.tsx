"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { SignupSchemaType, createProfileAPI, signupAPI, signupSchema } from "@/entities";
import { Button, Form, ROUTER_PATH, Spinner } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ConfirmPasswordField, PasswordField, UserIdField } from "../components";

export const SignupForm = () => {
  const router = useRouter();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userEmail: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSuccess = async (data: Awaited<ReturnType<typeof signupAPI>>) => {
    try {
      const user = data.user;
      const userEmailId = form.getValues("userEmail");

      if (!user) {
        toast.error("회원가입은 되었지만 사용자 정보를 확인할 수 없습니다.");
        return;
      }

      await createProfileAPI({
        id: user.id,
        email: user.email ?? `${userEmailId}@dobbit.com`,
        userName: userEmailId,
        nickname: userEmailId,
      });

      toast.success("회원가입 성공! 프로필이 생성되었습니다.");
      router.push(ROUTER_PATH.LOGIN);
      form.reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "프로필 생성 중 오류가 발생했습니다.";
      toast.error(message);
    }
  };

  const { mutate: signupMutate, isPending } = useMutation({
    mutationFn: (data: SignupSchemaType) => {
      return signupAPI({
        email: `${data.userEmail}@dobbit.com`,
        password: data.password,
      });
    },
    onSuccess,
  });

  const onSubmit = (data: SignupSchemaType) => {
    signupMutate(data);
  };

  return (
    <Form {...form}>
      <form className='flex w-full flex-col items-center justify-center gap-6' onSubmit={(e) => e.preventDefault()}>
        <div className='flex w-80 flex-col gap-6'>
          <UserIdField />
          <PasswordField />
          <ConfirmPasswordField />
        </div>
        <div className='flex w-80 justify-center gap-4'>
          <Button
            className='w-full py-5 text-white'
            type='submit'
            variant='secondary'
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? <Spinner /> : "회원가입"}
          </Button>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>이미 가입했다면?</span>
          <Link className='text-base font-bold text-primary hover:underline' href={ROUTER_PATH.LOGIN}>
            로그인
          </Link>
        </div>
      </form>
    </Form>
  );
};
