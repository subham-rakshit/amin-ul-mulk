import mongoose from "mongoose";

const serviceTranslationSchema = new mongoose.Schema(
  {
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    service_name: {
      type: String,
      required: true,
      trim: true,
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
    detailed_description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceTranslationModel =
  mongoose.models.Service_translation ||
  mongoose.model("Service_translation", serviceTranslationSchema);

export default ServiceTranslationModel;
