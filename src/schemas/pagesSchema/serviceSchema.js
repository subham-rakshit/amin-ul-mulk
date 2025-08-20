import mongoose from "mongoose";
import { z } from "zod";

// Utility to check if an ID is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Define a custom zod schema for optional ObjectId fields
const optionalObjectId = z
  .string()
  .refine((val) => !val || isValidObjectId(val), {
    message: "Invalid ObjectId",
  })
  .optional()
  .nullable();

export const ServiceValidationSchema = z.object({
  service_name: z
    .string()
    .min(1, { message: "Service Name is required." })
    .trim(),

  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .trim()
    .transform(
      (slug) =>
        slug
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "") // Remove invalid characters
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
          .replace(/^-|-$/g, "") // Remove leading or trailing hyphens
    )
    .refine((slug) => /^[a-z0-9-]+$/.test(slug), {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),

  order_number: z.string().trim().optional().default("1"),

  card_short_description: z.string().trim().optional().default(""),

  card_long_description: z.string().trim().optional().default(""),

  card_icon: optionalObjectId,

  card_image: optionalObjectId,

  banner_image: optionalObjectId,

  cover_image: optionalObjectId,

  detailed_description: z.string().trim().optional().default(""),

  meta_title: z.string().trim().optional().default(""),

  meta_keywords: z.string().trim().optional().default(""),

  meta_image: optionalObjectId,

  meta_description: z.string().trim().optional().default(""),
});
