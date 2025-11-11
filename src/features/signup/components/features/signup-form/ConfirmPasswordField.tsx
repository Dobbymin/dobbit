import type { SignupSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared";
import { useFormContext } from "react-hook-form";

export const ConfirmPasswordField = () => {
  const form = useFormContext<SignupSchemaType>();
  return (
    <FormField
      control={form.control}
      name='confirmPassword'
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 확인</FormLabel>
          <FormControl className='grid gap-3'>
            <Input {...field} placeholder='비밀번호를 다시 입력하세요' type='password' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
