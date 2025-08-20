import { useGenerateSlug } from "@/lib/hooks";
import mongoose from "mongoose";

const casePackagesSchema = new mongoose.Schema(
  {
    case_package_name: {
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
        return useGenerateSlug(this.case_package_name);
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
    package_price: {
      type: String,
      trim: true,
      required: true,
    },
    billing_cycle: {
      type: String,
      trim: true,
      required: true,
    },
    features_icon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
    package_features: {
      labels: {
        type: [String],
        default: [],
      },
    },
    details_button_label: {
      type: String,
      default: "",
      trim: true,
    },
    selection_button_label: {
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
        return this.case_package_name
          ? `${this.case_package_name} ${process.env.NEXT_PUBLIC_META_APP_NAME}`
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
      default: process.env.NEXT_PUBLIC_DEFAULT_META_APP_DESCRIPTION,
      set: function (value) {
        return value ? value : this.default;
      },
    },
  },
  {
    timestamps: true,
  }
);

const CasePackageModel =
  mongoose.models.Case_package ||
  mongoose.model("Case_package", casePackagesSchema);

export default CasePackageModel;
