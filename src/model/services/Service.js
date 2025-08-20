import mongoose from "mongoose";
import { useGenerateSlug } from "../../lib/hooks/index.js";

const serviceSchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: [1, "Slug is required."],
      default: function () {
        return useGenerateSlug(this.service_name);
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
    card_short_description: {
      type: String,
      default: "",
      trim: true,
    },
    card_long_description: {
      type: String,
      default: "",
      trim: true,
    },
    card_icon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    card_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    banner_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    cover_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    detailed_description: {
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
        return this.service_name
          ? `${this.service_name} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
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
      default: function () {
        return this.card_long_description
          ? this.card_long_description
          : "Meta description not provided.";
      },
      set: function (value) {
        return value ? value : this.default;
      },
    },
  },
  {
    timestamps: true,
  }
);

const ServiceModel =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default ServiceModel;
