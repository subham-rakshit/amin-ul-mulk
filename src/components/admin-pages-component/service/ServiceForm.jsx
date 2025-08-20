"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  PageRefresh,
  ServiceFormDetails,
  TranslationForm,
} from "@/components";
import ROUTES from "@/constants/routes";
import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { ServiceValidationSchema } from "@/schemas/pagesSchema/serviceSchema";
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

const ServiceForm = ({
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
  } = useForm({
    resolver: zodResolver(ServiceValidationSchema),
    defaultValues: {
      service_name:
        getTranslationDetails(translationDetails, activeTab)?.service_name ||
        "",
      slug: itemDetails?.slug || "",
      order_number: itemDetails?.order_number || "1",
      card_short_description:
        getTranslationDetails(translationDetails, activeTab)
          ?.card_short_description || "",
      card_long_description:
        getTranslationDetails(translationDetails, activeTab)
          ?.card_long_description || "",
      card_icon:
        itemDetails?.card_icon !== null ? itemDetails?.card_icon?._id : "",
      card_image:
        itemDetails?.card_image !== null ? itemDetails?.card_image?._id : "",
      banner_image:
        itemDetails?.banner_image !== null
          ? itemDetails?.banner_image?._id
          : "",
      cover_image:
        itemDetails?.cover_image !== null ? itemDetails?.cover_image?._id : "",
      detailed_description:
        getTranslationDetails(translationDetails, activeTab)
          ?.detailed_description || "",
      meta_title: itemDetails?.meta_title || "",
      meta_keywords: itemDetails?.meta_keywords || "",
      meta_image:
        itemDetails?.meta_image !== null ? itemDetails?.meta_image?._id : "",
      meta_description: itemDetails?.meta_description || "",
    },
  });
  const watchedServiceName = watch("service_name");

  // Relevant fields for comparison with the postDetails object (For Update Post)
  const relevantFields = {
    service_name:
      getTranslationDetails(translationDetails, activeTab)?.service_name || "",
    slug: itemDetails?.slug || "",
    order_number: itemDetails?.order_number || "1",
    card_short_description:
      getTranslationDetails(translationDetails, activeTab)
        ?.card_short_description || "",
    card_long_description:
      getTranslationDetails(translationDetails, activeTab)
        ?.card_long_description || "",
    card_icon:
      itemDetails?.card_icon !== null ? itemDetails?.card_icon?._id : "",
    card_image:
      itemDetails?.card_image !== null ? itemDetails?.card_image?._id : "",
    banner_image:
      itemDetails?.banner_image !== null ? itemDetails?.banner_image?._id : "",
    cover_image:
      itemDetails?.cover_image !== null ? itemDetails?.cover_image?._id : "",
    detailed_description:
      getTranslationDetails(translationDetails, activeTab)
        ?.detailed_description || "",
    meta_title: itemDetails?.meta_title || "",
    meta_keywords: itemDetails?.meta_keywords || "",
    meta_image:
      itemDetails?.meta_image !== null ? itemDetails?.meta_image?._id : "",
    meta_description: itemDetails?.meta_description || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Slug value according to the service_name (only if the service is new)
  useEffect(() => {
    const generateSlugWithServiceName = () => {
      if (watchedServiceName && watchedServiceName.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedServiceName);

        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (!isItemDetailsExist) {
      generateSlugWithServiceName();
    }
  }, [watchedServiceName, setValue, isItemDetailsExist]);

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

  // Handle Form Submit Functionality
  const onSubmit = async (data) => {
    // For Create New Service
    if (!isItemDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Service created successfully.");
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
          updateResponse?.message || "Service updated successfully."
        );
        if (relevantFields.slug !== watch("slug")) {
          router.push(ROUTES.ADMIN_ALL_SERVICES);
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
        <ServiceFormDetails
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
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          watchDescription={watch("detailed_description")}
          setValue={setValue}
          // UI & Theme
          theme={theme}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "service_name",
              lableName: "Service Name",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.service_name || "",
              placeholderText: "Service Name",
              fieldId: `translate-${activeTab}-update-service-name`,
            },
            {
              name: "card_short_description",
              lableName: "Card Short Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.card_short_description || "",
              placeholderText: "Card Short Description",
              fieldId: `translate-${activeTab}-update-service-card-short-description`,
              isAreaInputType: true,
            },
            {
              name: "card_long_description",
              lableName: "Card Long Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.card_long_description || "",
              placeholderText: "Card Long Description",
              fieldId: `translate-${activeTab}-update-service-card-long-description`,
              isAreaInputType: true,
            },
            {
              name: "detailed_description",
              lableName: "Detaild Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.detailed_description || "",
              fieldId: `translate-${activeTab}-update-service-detailed-description`,
              isTextEditorType: true,
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

export default ServiceForm;
