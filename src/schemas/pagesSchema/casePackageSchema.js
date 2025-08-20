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

export const CasePackageValidtionSchema = z.object({
  case_package_name: z
    .string()
    .min(1, { message: "Case Package Name is required." })
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

  package_price: z
    .string()
    .min(1, { message: "Case Package Price is required." })
    .transform((title) => title.trim()),

  billing_cycle: z
    .string()
    .min(1, { message: "Case Package Billing Cycle is required." })
    .transform((title) => title.trim()),

  features_icon: optionalObjectId,

  package_features: z.object({
    labels: z.array(z.string()).default([]),
  }),

  details_button_label: z.string().trim().optional().default(""),

  selection_button_label: z.string().trim().optional().default(""),

  meta_title: z.string().trim().optional().default(""),

  meta_keywords: z.string().trim().optional().default(""),

  meta_image: optionalObjectId,

  meta_description: z.string().trim().optional().default(""),
});
