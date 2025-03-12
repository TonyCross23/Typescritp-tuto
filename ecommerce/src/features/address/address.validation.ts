import { z } from "zod";

export const AddressSchema = z.object({
  lineOne: z.string({
    required_error: "required",
  }),
  lineTwo: z.string({
    required_error: "required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  pincode: z
    .string({
      required_error: "pincode is required",
    })
    .min(6),
});

export const updateUserSchema = z.object({
  name: z
    .string({
      required_error: "required",
    })
    .optional(),
  defaultShippingAddress: z
    .number({
      required_error: "required",
    })
    .optional(),
  defaultBillingAddress: z
    .number({
      required_error: "required",
    })
    .optional(),
});
