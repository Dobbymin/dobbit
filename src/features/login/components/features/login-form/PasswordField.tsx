"use client";

import type { LoginSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared";
import { useFormContext } from "react-hook-form";

export const PasswordField = () => {
  const form = useFormContext<LoginSchemaType>();
  return (
    <FormField
      control={form.control}
      name='password'
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호</FormLabel>
          <FormControl className='grid gap-3'>
            <Input {...field} placeholder='비밀번호를 입력하세요' type='password' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
