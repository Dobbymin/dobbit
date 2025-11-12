"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LoginResponse, LoginSchemaType, loginAPI, loginSchema, useAuthStore } from "@/entities";
import { Button, Form, ROUTER_PATH, Spinner } from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { PasswordField, UserIdField } from "../components";

export const LoginForm = () => {
  const { setAccessToken } = useAuthStore();

  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSuccess = (data: LoginResponse) => {
    toast.success("로그인 성공!");
    setAccessToken(data.accessToken);

    router.push(ROUTER_PATH.HOME);
    form.reset();
  };

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: async (data: LoginSchemaType) => {
      const response = await loginAPI({
        email: `${data.userId}@dobbit.com`,
        password: data.password,
      });
      return {
        accessToken: response.session.access_token,
      } as LoginResponse;
    },
    onSuccess,
  });

  const onSubmit = (data: LoginSchemaType) => {
    loginMutate(data);
  };

  return (
    <Form {...form}>
      <form className='flex w-full flex-col items-center justify-center gap-6' onSubmit={(e) => e.preventDefault()}>
        <div className='flex w-80 flex-col gap-4'>
          <UserIdField />
          <PasswordField />
        </div>
        <div className='flex w-80 justify-center gap-4'>
          <Button
            className='w-full py-5 text-white'
            disabled={!form.formState.isValid || isPending}
            type='submit'
            variant='secondary'
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? <Spinner /> : "로그인"}
          </Button>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-sm'>아직 회원이 아니신가요?</span>
          <Link className='text-base font-bold text-primary/80 hover:underline' href={ROUTER_PATH.SIGNUP}>
            회원가입
          </Link>
        </div>
      </form>
    </Form>
  );
};
