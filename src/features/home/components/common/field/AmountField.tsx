"use client";

import { OrderSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared";
import { useFormContext } from "react-hook-form";

export const AmountField = () => {
  const form = useFormContext<OrderSchemaType>();
  return (
    <FormField
      control={form.control}
      name='amount'
      render={({ field }) => (
        <FormItem className='flex w-full gap-1'>
          <FormLabel className='text-md w-25 gap-1'>
            <p>수량</p>
            <p className='text-[10px] font-bold text-text-dark'>(WAXP)</p>
          </FormLabel>
          <FormControl>
            <Input {...field} placeholder='수량을 입력하세요' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
