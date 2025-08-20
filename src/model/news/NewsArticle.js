import mongoose from "mongoose";
import { useGenerateSlug } from "../../lib/hooks/index.js";

const allNewsArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [5, "Title must be at least 5 characters long"],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [1, "Slug is required."],
      default: function () {
        return useGenerateSlug(this.title);
      },
      set: function (value) {
        return value ? useGenerateSlug(value) : this.default;
      },
    },
    order_number: {
      type: String,
      trim: true,
      default: "1",
    },
    banner_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    featured_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    small_image_option_1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    small_image_option_2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    meta_title: {
      type: String,
      trim: true,
      default: function () {
        return this.title
          ? `${this.title} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
          : process.env.NEXT_PUBLIC_DEFAULT_META_APP_NAME;
      },
      set: function (value) {
        return value ? value : this.default;
      },
    },
    meta_keywords: {
      type: String,
      trim: true,
      default: "",
    },
    meta_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    meta_description: {
      type: String,
      trim: true,
      default: `${process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION}`,
      set: function (value) {
        return value ? value : this.default;
      },
    },
  },
  { timestamps: true }
);

const AllNewsArticleModel =
  mongoose.models.News_article ||
  mongoose.model("News_article", allNewsArticleSchema);

export default AllNewsArticleModel;
