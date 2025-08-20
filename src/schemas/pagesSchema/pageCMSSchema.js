import mongoose from "mongoose";
import { z } from "zod";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

export const PageCMSValidationSchema = z.object({
  pageName: z
    .string()
    .min(1, { message: "Page name is required." })
    .transform((val) => val.trim()),
  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .trim()
    .transform(
      (slug) => slug.toLowerCase().replace(/ /g, "-") // Replace spaces with hyphens (optional)
    )
    .refine((slug) => /^[a-z0-9\-\/\?\=\&\#]+$/.test(slug), {
      message:
        "Slug can only contain lowercase letters, numbers, hyphens, slashes, question marks, equal signs, ampersands, and hash symbols.",
    }),
  description: z
    .string()
    .default("")
    .transform((val) => val.trim()),
  metaTitle: z
    .string()
    .default("")
    .transform((val) => val.trim()),
  metaImage: z
    .string()
    .nullable()
    .refine((value) => value === null || isValidId(value), {
      message: "Meta Image must be a valid ObjectId or null.",
    })
    .default(null),
  metaKeywords: z
    .string()
    .default("")
    .transform((val) => val.trim()),
  metaDescription: z
    .string()
    .default("")
    .transform((val) => val.trim()),
});
