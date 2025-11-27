"use client";

import { OrderSchemaType } from "@/entities";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared";
import { useFormContext } from "react-hook-form";

type PriceFieldProps = {
  onValueChange?: (value: number) => void;
};

export const PriceField = ({ onValueChange }: PriceFieldProps) => {
  const form = useFormContext<OrderSchemaType>();
  return (
    <FormField
      control={form.control}
      name='price'
      render={({ field }) => (
        <FormItem className='flex w-full gap-1'>
          <FormLabel className='text-md w-25 gap-1'>
            <p>가격</p>
            <p className='text-[10px] font-bold text-text-dark'>(KRW)</p>
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className='border-none bg-text-light'
              type='number'
              placeholder='가격을 입력하세요'
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
