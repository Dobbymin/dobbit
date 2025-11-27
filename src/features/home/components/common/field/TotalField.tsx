"use client";

import { OrderSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared";
import { useFormContext } from "react-hook-form";

type TotalFieldProps = {
  onValueChange?: (value: number) => void;
};

export const TotalField = ({ onValueChange }: TotalFieldProps) => {
  const form = useFormContext<OrderSchemaType>();
  return (
    <FormField
      control={form.control}
      name='total'
      render={({ field }) => (
        <FormItem className='flex w-full gap-1'>
          <FormLabel className='text-md w-25 gap-1'>
            <p>총액</p>
            <p className='text-[10px] font-bold text-text-dark'>(KRW)</p>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type='number'
              placeholder='총액을 입력하세요'
              className='border-none bg-text-light'
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                field.onChange(value);
                onValueChange?.(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
