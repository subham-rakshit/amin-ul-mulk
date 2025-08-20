import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const TestimonialSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .transform((val) => val.trim()),
  message: z
    .string()
    .min(1, "Message is required.")
    .transform((val) => val.trim()),
  order_number: z.string().trim().optional().default("1"),
});
