import { PERMISSIONS } from "@/constants/permissions";
import dbConnect from "@/lib/db/dbConnect";
import { useSlugNanoid, useTitleNanoid } from "@/lib/hooks";
import CasePackageModel from "@/model/case-package/CasePackage";
import CasePackageTranslationModel from "@/model/case-package/CasePackageTranslation";
import { CasePackageValidtionSchema } from "@/schemas/pagesSchema/casePackageSchema";
import { checkAuthorization } from "@/utils/permissionHandler";
import { errorResponse, successResponse } from "@/utils/responseHandler";
import { validateSchema } from "@/utils/validateSchemaHandler";
import mongoose from "mongoose";

export async function POST(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { userId } = await params;

    const body = await request.json();
    const {
      case_package_name,
      slug,
      order_number,
      package_price,
      billing_cycle,
      features_icon,
      package_features,
      details_button_label,
      selection_button_label,
      meta_title,
      meta_keywords,
      meta_image,
      meta_description,
    } = body;

    // NOTE Check invalid inputs
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CASE_PACKAGE.ADD_CASE_PACKAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    const validatedFields = validateSchema(CasePackageValidtionSchema, {
      case_package_name,
      slug,
      order_number,
      package_price,
      billing_cycle,
      features_icon,
      package_features,
      details_button_label,
      selection_button_label,
      meta_title,
      meta_keywords,
      meta_image,
      meta_description,
    });
    if (!validatedFields.success) {
      return errorResponse({ status: 400, errors: validatedFields.errors });
    }

    // Extract excisting package related to package name and slug
    let updatedName = case_package_name;
    let updatedSlug = slug;

    const existingCasePackages = await CasePackageModel.find({
      $or: [{ slug }, { case_package_name }],
    });

    // Handle Duplicate case package name (Add Random Characters)
    if (
      existingCasePackages &&
      existingCasePackages.some(
        (pckg) => pckg.case_package_name === case_package_name
      )
    ) {
      updatedName = `${case_package_name} ${useTitleNanoid()}`;
    }

    // Handle Duplicate case package Slug (Add Random Characters)
    if (
      existingCasePackages &&
      existingCasePackages.some((pckg) => pckg.slug === slug)
    ) {
      updatedSlug = `${slug}-${useSlugNanoid()}`;
    }

    // Create a new case package and save into DB
    const newCasePackage = new CasePackageModel({
      case_package_name: updatedName,
      slug: updatedSlug,
      order_number: order_number || "1",
      package_price,
      billing_cycle,
      features_icon: features_icon || null,
      package_features: package_features || { labels: [] },
      details_button_label: details_button_label || "",
      selection_button_label: selection_button_label || "",
      meta_title: meta_title || "",
      meta_keywords: meta_keywords || "",
      meta_image: meta_image || null,
      meta_description: meta_description || "",
    });
    const savedCasePackage = await newCasePackage.save();

    // Store case_package_name, package_price, billing_cycle, package_features, details_button_label, selection_button_label tags in the CasePackageTranslationModel collection with lang = "en" default
    const createEnTranslation =
      await CasePackageTranslationModel.findOneAndUpdate(
        {
          referenceId: savedCasePackage._id.toString(),
          lang: "en",
        },
        {
          $set: {
            case_package_name,
            package_price,
            billing_cycle: billing_cycle || "",
            package_features: package_features || { labels: [] },
            details_button_label: details_button_label || "",
            selection_button_label: selection_button_label || "",
          },
        },
        { new: true, upsert: true }
      );
    if (!createEnTranslation) {
      return errorResponse({
        message:
          "An usexpected error occure while saving news data in translation collection.",
        status: 400,
      });
    }

    return successResponse({
      message: "Case Package created successfully.",
      status: 201,
    });
  } catch (error) {
    console.log("Error in creating case package SERVER: ", error);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
