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

export const AllNewsArticleSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .transform((title) => title.trim()),

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

  banner_image: optionalObjectId,

  featured_image: optionalObjectId,

  description: z.string().trim().optional().default(""),

  small_image_option_1: optionalObjectId,

  small_image_option_2: optionalObjectId,

  meta_title: z.string().trim().optional().default(""),

  meta_keywords: z.string().trim().optional().default(""),

  meta_image: optionalObjectId,

  meta_description: z.string().trim().optional().default(""),
});
