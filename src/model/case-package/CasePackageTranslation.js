import mongoose from "mongoose";

const casePackagesSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case_package",
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    case_package_name: {
      type: String,
      required: true,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

const CasePackageTranslationModel =
  mongoose.models.Case_package_translation ||
  mongoose.model("Case_package_translation", casePackagesSchema);

export default CasePackageTranslationModel;
