import { z } from "zod";

export const orderSchema = z.object({
  price: z.number(),
  amount: z.number(),
  total: z.number(),
});

export type OrderSchemaType = z.infer<typeof orderSchema>;
