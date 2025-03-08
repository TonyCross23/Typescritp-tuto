import { z } from "zod";

export const createCartItemSchema = z.object({
  productId: z.number({
    required_error: "required",
  }),
  quantity: z.number({
    required_error: "required",
  }),
});

export const changeQuantitySchema = z.object({
  quantity: z.number({
    required_error: "required",
  }),
});
