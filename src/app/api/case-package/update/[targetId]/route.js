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

export async function PUT(request, context) {
  await dbConnect();

  try {
    const { params } = context;
    const { searchParams } = new URL(request.url);

    const { targetId } = await params;
    const userId = searchParams.get("userId");

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
      translateData = {},
    } = body;

    // Is translation data provided
    const isTranslationData = Object.keys(translateData).length > 0;

    // Check validate requested IDs
    if (
      !userId ||
      !targetId ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(targetId)
    ) {
      return errorResponse({
        message: "Invalid request. Please try again later.",
        status: 400,
      });
    }

    // Authentication Check
    const authCheck = await checkAuthorization({
      targetId: userId,
      requiredPermissions: [PERMISSIONS.CASE_PACKAGE.EDIT_CASE_PACKAGE],
    });
    if (!authCheck.success) {
      return errorResponse({ message: authCheck.message, status: 403 });
    }

    // VALIDATE the request data
    if (!isTranslationData) {
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

      // Check if case package exists
      const existingCasePackages =
        await CasePackageModel.findById(targetId).exec();
      if (!existingCasePackages) {
        return errorResponse({
          message: "Case Pacakge not found.",
          status: 404,
        });
      }

      // Only check for duplicates if package name and slug are changed
      let newSlug = slug;
      let newName = case_package_name;
      if (
        case_package_name !== existingCasePackages.case_package_name ||
        slug !== existingCasePackages.slug
      ) {
        const existingCasePackagesDetails = await CasePackageModel.find({
          $or: [{ slug }, { case_package_name }],
          _id: { $ne: targetId },
        }).exec();

        // Handle Duplicate case package name (Add Random Characters)
        if (
          existingCasePackagesDetails &&
          existingCasePackagesDetails.some(
            (pckg) => pckg.case_package_name === case_package_name
          )
        ) {
          newName = `${case_package_name} ${useTitleNanoid()}`;
        }

        // Handle Duplicate case package Slug (Add Random Characters)
        if (
          existingCasePackagesDetails &&
          existingCasePackagesDetails.some((pckg) => pckg.slug === slug)
        ) {
          newSlug = `${slug}-${useSlugNanoid()}`;
        }
      }

      // Set news case package updated values object
      const updatedCasePackageObj = {
        case_package_name: newName,
        slug: newSlug,
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
      };

      // Update the case package
      const updatedCasePackage = await CasePackageModel.findOneAndUpdate(
        { _id: targetId },
        { $set: updatedCasePackageObj },
        { new: true }
      ).exec();
      if (!updatedCasePackage) {
        return errorResponse({
          message: "Falid to update the case package. Please try again later.",
          status: 500,
        });
      }

      // Update English translation
      const updateEnTranslation =
        await CasePackageTranslationModel.findOneAndUpdate(
          {
            referenceId: updatedCasePackage._id.toString(),
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
          {
            new: true,
            upsert: true,
          }
        );
      if (!updateEnTranslation) {
        return errorResponse({
          message:
            "An unexpected error occurred while updating the english translation.",
          status: 400,
        });
      }

      return successResponse({
        message: "Case Package updated successfully. Refreshing the page...",
        status: 200,
      });
    }

    // Handle other languages translation update
    const updateOtherTranslations =
      await CasePackageTranslationModel.findOneAndUpdate(
        {
          referenceId: targetId,
          lang: translateData.lang,
        },
        {
          $set: {
            case_package_name: translateData?.case_package_name || "",
            package_price: translateData?.package_price || "",
            billing_cycle: translateData?.billing_cycle || "",
            package_features: translateData?.package_features || { labels: [] },
            details_button_label: translateData?.details_button_label || "",
            selection_button_label: translateData?.selection_button_label || "",
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
    if (!updateOtherTranslations) {
      return errorResponse({
        message: `An unexpected error occurred while updating the ${translateData.lang} translation.`,
        status: 400,
      });
    }

    return successResponse({
      message: `Case Package has been updated successfully. Refreshing the page...`,
      status: 200,
    });
  } catch (error) {
    console.log(`Error in updating the case package SERVER: ${error}`);
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
