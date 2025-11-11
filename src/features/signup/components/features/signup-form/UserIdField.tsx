import type { SignupSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared";
import { useFormContext } from "react-hook-form";

export const UserIdField = () => {
  const form = useFormContext<SignupSchemaType>();

  return (
    <FormField
      control={form.control}
      name='userEmail'
      render={({ field }) => (
        <FormItem>
          <FormLabel>아이디</FormLabel>
          <FormControl className='grid gap-3'>
            <Input {...field} placeholder='아이디를 입력하세요' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
