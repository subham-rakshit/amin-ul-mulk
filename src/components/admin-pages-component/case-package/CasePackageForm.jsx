"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CasePackageFormDetails,
  LanguageTabs,
  PageRefresh,
  TranslationForm,
} from "@/components";
import ROUTES from "@/constants/routes";
import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { CasePackageValidtionSchema } from "@/schemas/pagesSchema/casePackageSchema";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const CasePackageForm = ({
  userId,
  languages = [],
  itemDetails = {},
  translationDetails = {},
  filesList,
  allFiles,
  paginationDetails,
  createFnc = () => {},
  updateFnc = () => {},
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
}) => {
  const [activeTab, setActiveTab] = useState("en");

  const { isPending, pageRefresh } = usePageRefresh();

  const { layoutThemePrimaryColorType } = useAppSelector(
    (state) => state.layout
  );
  const { theme } = useTheme();
  const { bgColor, hoverBgColor, textColor, hexCode } = useMemo(
    () => getCustomTheme({ layoutThemePrimaryColorType }),
    [layoutThemePrimaryColorType]
  );

  const isItemDetailsExist = Object.keys(itemDetails).length > 0;
  const activeLanguages = languages.filter((lang) => lang.status);
  const router = useRouter();

  // Handle React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError,
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(CasePackageValidtionSchema),
    defaultValues: {
      case_package_name:
        getTranslationDetails(translationDetails, activeTab)
          ?.case_package_name || "",
      slug: itemDetails?.slug || "",
      order_number: itemDetails?.order_number || "1",
      package_price:
        getTranslationDetails(translationDetails, activeTab)?.package_price ||
        "",
      billing_cycle:
        getTranslationDetails(translationDetails, activeTab)?.billing_cycle ||
        "",
      features_icon:
        itemDetails?.features_icon !== null
          ? itemDetails?.features_icon?._id
          : "",
      package_features: getTranslationDetails(translationDetails, activeTab)
        ?.package_features || { labels: [] },
      details_button_label:
        getTranslationDetails(translationDetails, activeTab)
          ?.details_button_label || "",
      selection_button_label:
        getTranslationDetails(translationDetails, activeTab)
          ?.selection_button_label || "",
      meta_title: itemDetails?.meta_title || "",
      meta_keywords: itemDetails?.meta_keywords || "",
      meta_image:
        itemDetails?.meta_image !== null ? itemDetails?.meta_image?._id : "",
      meta_description: itemDetails?.meta_description || "",
    },
  });
  const watchedPackageName = watch("case_package_name");

  // Relevant fields for comparison with the postDetails object (For Update Post)
  const relevantFields = {
    case_package_name:
      getTranslationDetails(translationDetails, activeTab)?.case_package_name ||
      "",
    slug: itemDetails?.slug || "",
    order_number: itemDetails?.order_number || "1",
    package_price:
      getTranslationDetails(translationDetails, activeTab)?.package_price || "",
    billing_cycle:
      getTranslationDetails(translationDetails, activeTab)?.billing_cycle || "",
    features_icon:
      itemDetails?.features_icon !== null
        ? itemDetails?.features_icon?._id
        : "",
    package_features: getTranslationDetails(translationDetails, activeTab)
      ?.package_features || { labels: [] },
    details_button_label:
      getTranslationDetails(translationDetails, activeTab)
        ?.details_button_label || "",
    selection_button_label:
      getTranslationDetails(translationDetails, activeTab)
        ?.selection_button_label || "",
    meta_title: itemDetails?.meta_title || "",
    meta_keywords: itemDetails?.meta_keywords || "",
    meta_image:
      itemDetails?.meta_image !== null ? itemDetails?.meta_image?._id : "",
    meta_description: itemDetails?.meta_description || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Slug value according to the case_package_name (only if the service is new)
  useEffect(() => {
    const generateSlugWithServiceName = () => {
      if (watchedPackageName && watchedPackageName.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedPackageName);

        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (!isItemDetailsExist) {
      generateSlugWithServiceName();
    }
  }, [watchedPackageName, setValue, isItemDetailsExist]);

  // Handle Image Change
  const onChangeImage = useCallback(
    (keyName, id) => {
      if (keyName) {
        setValue(keyName, id || "");
      }
    },
    [setValue]
  );

  // Handle Validation Errors
  const handleValidationErrors = useCallback(
    (errors) => {
      Object.keys(errors).forEach((field) => {
        setError(field, {
          type: "server",
          message: errors[field].message,
        });
      });
    },
    [setError]
  );

  // Handle Add Repeatable Field Functionality
  const handleAddRepeatableField = useCallback((keyName, labelNames = []) => {
    const currentField = getValues(keyName) || [];

    // Create updated field structure
    const updatedField = labelNames.reduce((acc, key) => {
      acc[key] = [...(currentField[key] || []), ""];

      return acc;
    }, {});

    setValue(keyName, { ...currentField, ...updatedField });
  }, []);

  // Handle On Change Repeatable Fields
  const handleOnChangeRepeatableFields = useCallback(
    (keyName, labelName, value, index) => {
      const currentField = getValues(`${keyName}.${labelName}`) || [];
      const updatedArray = currentField.map((item, i) =>
        i === index ? value : item
      );
      setValue(`${keyName}.${labelName}`, updatedArray);
    },
    []
  );

  // Handle Remove Repeatable Field Functionality
  const handleRemoveRepeatableField = useCallback(
    (keyName, labelNames = [], index) => {
      const currentField = getValues(keyName) || {};

      const updatedField = labelNames.reduce((acc, label) => {
        acc[label] = (currentField[label] || []).filter((_, i) => i !== index);
        return acc;
      }, {});

      setValue(keyName, { ...currentField, ...updatedField });
    },
    []
  );

  // Handle Form Submit Functionality
  const onSubmit = async (data) => {
    // For Create New Service
    if (!isItemDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(
          response?.message || "Case Package created successfully."
        );
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update Service
    else {
      const updateResponse = await updateFnc(
        userId,
        itemDetails?.slug || "",
        itemDetails._id,
        data
      );

      if (updateResponse.success) {
        useSuccessToast(
          updateResponse?.message || "Case Package updated successfully."
        );
        if (relevantFields.slug !== watch("slug")) {
          router.push(ROUTES.ADMIN_ALL_CASE_PACKAGES);
        } else {
          pageRefresh();
        }
      } else {
        if (updateResponse.errors) {
          handleValidationErrors(updateResponse.errors);
        } else {
          useErrorToast(updateResponse?.message || "Something went wrong.");
        }
      }
    }
  };

  // Handle Translation Form Submit
  const handleTranslationSubmit = async (translateData) => {
    const data = {
      ...watch(),
      translateData: { ...translateData, lang: activeTab },
    };

    await onSubmit(data);
  };

  // Handle Refresh Page Loading when update API runs
  if (isPending) {
    return <PageRefresh />;
  }

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      {isItemDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <CasePackageFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Post Details & Form State
          itemDetails={itemDetails}
          isItemDetailsExist={isItemDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          // Category & File Management
          filesList={filesList}
          allFiles={allFiles}
          selectedFileType={selectedFileType}
          onChangeImage={onChangeImage}
          handleAddRepeatableField={handleAddRepeatableField}
          handleOnChangeRepeatableFields={handleOnChangeRepeatableFields}
          handleRemoveRepeatableField={handleRemoveRepeatableField}
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          formData={watch()}
          // watchDescription={watch("detailed_description")}
          setValue={setValue}
          // UI & Theme
          theme={theme}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "case_package_name",
              lableName: "Package Name",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.case_package_name || "",
              placeholderText: "Package Name",
              fieldId: `translate-${activeTab}-update-case-package-name`,
            },
            {
              name: "package_price",
              lableName: "Price",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.package_price || "",
              placeholderText: "Price",
              fieldId: `translate-${activeTab}-update-case-package-price`,
            },
            {
              name: "billing_cycle",
              lableName: "Billing Cycle",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.billing_cycle || "",
              placeholderText: "Billing Cycle",
              fieldId: `translate-${activeTab}-update-case-package-billing-cycle`,
            },
            {
              name: "package_features",
              lableName: "Features",
              value: {
                labels:
                  getTranslationDetails(translationDetails, activeTab)
                    ?.package_features?.labels || [],
              },
              placeholderText: "Feature Text",
              fieldId: `translate-${activeTab}-update-case-package-features`,
              isRepeatableType: true,
            },
            {
              name: "details_button_label",
              lableName: "Details Button Text",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.details_button_label || "",
              placeholderText: "Details Button Text",
              fieldId: `translate-${activeTab}-update-case-package-details-button-label`,
            },
            {
              name: "selection_button_label",
              lableName: "Selection Button Text",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.selection_button_label || "",
              placeholderText: "Selection Button Text",
              fieldId: `translate-${activeTab}-update-case-package-selection-button-label`,
            },
          ]}
          isSubmitting={isSubmitting}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
          handleTranslationSubmit={handleTranslationSubmit}
          theme={theme}
        />
      )}
    </div>
  );
};

export default CasePackageForm;
