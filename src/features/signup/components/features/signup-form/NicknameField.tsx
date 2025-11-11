import type { SignupSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared";
import { useFormContext } from "react-hook-form";

export const NicknameField = () => {
  const form = useFormContext<SignupSchemaType>();

  return (
    <FormField
      control={form.control}
      name='nickname'
      render={({ field }) => (
        <FormItem>
          <FormLabel>닉네임</FormLabel>
          <FormControl className='grid gap-3'>
            <Input {...field} placeholder='닉네임을 입력하세요' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
