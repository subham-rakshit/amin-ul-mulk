import dbConnect from "@/lib/db/dbConnect";
import CasePackageModel from "@/model/case-package/CasePackage";
import CasePackageTranslationModel from "@/model/case-package/CasePackageTranslation";
import FilesModel from "@/model/Files";
import LanguagesModel from "@/model/Language";
import { errorResponse, successResponse } from "@/utils/responseHandler";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);

    const page =
      parseInt(searchParams.get("page")) === NaN
        ? 0
        : parseInt(searchParams.get("page"));
    const pageSize =
      parseInt(searchParams.get("pageSize")) === NaN
        ? 0
        : parseInt(searchParams.get("pageSize"));

    // All Case Packages
    const casePackageLists = await CasePackageModel.find({
      is_active: true,
    })
      .populate({
        path: "features_icon",
        model: FilesModel,
        select: "fileUrl fileName fileType",
        match: { _id: { $ne: null } },
      })
      .select("-__v -meta_title -meta_keywords -meta_image -meta_description")
      .sort({ createdAt: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Convert order_number to number & sort
    const sortedPackages = casePackageLists.sort(
      (a, b) => Number(b.order_number) - Number(a.order_number)
    );

    // Fetch all active languages
    const languages = await LanguagesModel.find({
      status: true,
    }).exec();

    // Fetch translations in one query
    const packageIds = sortedPackages.map((pkg) => pkg._id);
    const translations = await CasePackageTranslationModel.find({
      referenceId: { $in: packageIds },
    })
      .select("-__v -createdAt -updatedAt -_id -referenceType")
      .exec();

    // Map translations by article ID
    const translationMap = {};
    translations.forEach(
      ({
        referenceId,
        lang,
        case_package_name,
        package_price,
        billing_cycle,
        package_features,
        details_button_label,
        selection_button_label,
      }) => {
        if (!translationMap[referenceId]) {
          translationMap[referenceId] = {};
        }
        translationMap[referenceId][lang] = {
          case_package_name,
          package_price,
          billing_cycle,
          package_features,
          details_button_label,
          selection_button_label,
        };
      }
    );

    // Process packages and attach translations
    const formattedPackageLists = sortedPackages.map((eachPkg) => {
      const packageData = eachPkg.toObject();

      // Initialize translations data as objects
      packageData.case_package_name = {};
      packageData.package_price = {};
      packageData.billing_cycle = {};
      packageData.package_features = {};
      packageData.details_button_label = {};
      packageData.selection_button_label = {};

      // Fetch translations for the current article
      const translations = translationMap[eachPkg._id];

      // If translations exist, populate the fields
      if (translations) {
        // Loop through all available languages
        for (const lang in translations) {
          if (translations[lang]) {
            // Assign translations
            packageData.case_package_name[lang] =
              translations[lang].case_package_name || "";
            packageData.package_price[lang] =
              translations[lang].package_price || "";
            packageData.billing_cycle[lang] =
              translations[lang].billing_cycle || "";
            packageData.package_features[lang] =
              translations[lang].package_features || [];
            packageData.details_button_label[lang] =
              translations[lang].details_button_label || "";
            packageData.selection_button_label[lang] =
              translations[lang].selection_button_label || "";
          }
        }
      }

      return packageData;
    });

    // Pagination
    const paginationTotalArticles =
      await CasePackageModel.countDocuments().exec();
    const totalItemsCount = await CasePackageModel.countDocuments().exec();
    const paginationData = {
      currentPage: page,
      currentLimit: pageSize === 0 ? totalItemsCount : pageSize,
      totalPages: Math.ceil(paginationTotalArticles / pageSize),
      totalItemsPerQuery: paginationTotalArticles,
      totalItemsCount,
    };

    return successResponse({
      status: 200,
      packages: formattedPackageLists,
      paginationData,
    });
  } catch (error) {
    console.log(
      `Error in getting all case packages FE: ${error.stack || error}`
    );
    return errorResponse({
      message: "An unexpected error occurred. Internal server error.",
      status: 500,
    });
  }
}
