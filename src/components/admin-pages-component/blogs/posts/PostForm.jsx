"use client";

import { useTheme } from "next-themes";

import { globalStyleObj } from "@/app/assets/styles";
import {
  LanguageTabs,
  PageRefresh,
  PostFormDetails,
  TranslationForm,
} from "@/components";
import { useErrorToast, useGenerateSlug, useSuccessToast } from "@/lib/hooks";
import { AllNewsArticleSchema } from "@/schemas/pagesSchema/newsArticleSchema";
import { useAppSelector } from "@/store/hooks";
import { getCustomTheme } from "@/utils/colors";
import { usePageRefresh } from "@/utils/refreshPage";
import { getTranslationDetails } from "@/utils/translation-helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const BlogPostForm = ({
  userId,
  languages = [],
  postDetails = {},
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
  const isPostDetailsExist = Object.keys(postDetails).length > 0;
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
    resolver: zodResolver(AllNewsArticleSchema),
    defaultValues: {
      title: getTranslationDetails(translationDetails, "en")?.title || "",
      slug: postDetails?.slug || "",
      order_number: postDetails?.order_number || "1",
      banner_image:
        postDetails?.banner_image !== null
          ? postDetails?.banner_image?._id
          : "",
      featured_image:
        postDetails?.featured_image !== null
          ? postDetails?.featured_image?._id
          : "",
      description:
        getTranslationDetails(translationDetails, "en")?.description || "",
      small_image_option_1:
        postDetails?.small_image_option_1 !== null
          ? postDetails?.small_image_option_1?._id
          : "",
      small_image_option_2:
        postDetails?.small_image_option_2 !== null
          ? postDetails?.small_image_option_2?._id
          : "",
      meta_title: postDetails?.meta_title || "",
      meta_keywords: postDetails?.meta_keywords || "",
      meta_image:
        postDetails?.meta_image !== null
          ? (postDetails?.meta_image?._id ?? null)
          : null,
      meta_description: postDetails?.meta_description || "",
    },
  });
  const watchedTitle = watch("title");

  // Relevant fields for comparison with the postDetails object (For Update Post)
  const relevantFields = {
    title: getTranslationDetails(translationDetails, "en")?.title || "",
    slug: postDetails?.slug || "",
    order_number: postDetails?.order_number || "1",
    banner_image:
      postDetails?.banner_image !== null ? postDetails?.banner_image?._id : "",
    featured_image:
      postDetails?.featured_image !== null
        ? postDetails?.featured_image?._id
        : "",
    description:
      getTranslationDetails(translationDetails, "en")?.description || "",
    small_image_option_1:
      postDetails?.small_image_option_1 !== null
        ? postDetails?.small_image_option_1?._id
        : "",
    small_image_option_2:
      postDetails?.small_image_option_2 !== null
        ? postDetails?.small_image_option_2?._id
        : "",
    meta_title: postDetails?.meta_title || "",
    meta_keywords: postDetails?.meta_keywords || "",
    meta_image:
      postDetails?.meta_image !== null
        ? (postDetails?.meta_image?._id ?? null)
        : null,
    meta_description: postDetails?.meta_description || "",
  };
  const hasChanges = !isEqual(relevantFields, watch());

  // Handle Slug value according to the title (only if the post is new)
  useEffect(() => {
    const generateSlugWithPostTitle = () => {
      if (watchedTitle && watchedTitle.length > 0) {
        setError("slug", "");
        const generatedSlug = useGenerateSlug(watchedTitle);
        setValue("slug", generatedSlug);
      } else {
        setValue("slug", "");
      }
    };

    if (!isPostDetailsExist) {
      generateSlugWithPostTitle();
    }
  }, [watchedTitle, setValue, isPostDetailsExist]);

  // Handle Banner Image
  const onChangeImageFiled = useCallback(
    (keyname, id) => {
      if (keyname) {
        setValue(keyname, id);
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
    // For Create New Blog
    if (!isPostDetailsExist) {
      const response = await createFnc(data, userId);

      if (response.success) {
        useSuccessToast(response?.message || "Post created successfully.");
        reset();
      } else {
        if (response.errors) {
          handleValidationErrors(response.errors);
        } else {
          useErrorToast(response?.message || "Something went wrong.");
        }
      }
    }

    // For Update Blog
    else {
      const updatePostResponse = await updateFnc(
        userId,
        postDetails?.slug || "",
        postDetails._id,
        data
      );

      if (updatePostResponse.success) {
        useSuccessToast(
          updatePostResponse?.message || "Post updated successfully."
        );

        pageRefresh();
      } else {
        if (updatePostResponse.errors) {
          handleValidationErrors(updatePostResponse.errors);
        } else {
          useErrorToast(updatePostResponse?.message || "Something went wrong.");
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

  console.log(watch());

  return (
    <div
      className={`${globalStyleObj.backgroundLight900Dark300} mt-[40px] rounded-sm shadow-light overflow-hidden`}
    >
      {isPostDetailsExist && activeLanguages.length > 1 && (
        <LanguageTabs
          languages={activeLanguages}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      )}

      {activeTab === "en" ? (
        <PostFormDetails
          // User & Role
          userId={userId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // Post Details & Form State
          itemDetails={postDetails}
          isPostDetailsExist={isPostDetailsExist}
          isSubmitting={isSubmitting}
          hasChanges={hasChanges}
          submitFunction={handleSubmit(onSubmit)}
          control={control}
          errors={errors}
          // Category & File Management
          filesList={filesList}
          allFiles={allFiles}
          selectedFileType={selectedFileType}
          onChangeImageFiled={onChangeImageFiled}
          // Pagination & Search
          paginationDetails={paginationDetails}
          searchValue={searchValue}
          // Form Filed Controls
          watchDescription={watch("description")}
          setValue={setValue}
          // UI & Theme
          theme={theme}
          colorGrade={{ bgColor, hoverBgColor, textColor, hexCode }}
        />
      ) : (
        <TranslationForm
          fields={[
            {
              name: "title",
              lableName: "Title",
              value:
                getTranslationDetails(translationDetails, activeTab)?.title ||
                "",
              placeholderText: "Enter Blog Title",
              fieldId: `translate-${activeTab}-update-blog-title`,
            },
            {
              name: "description",
              lableName: "Description",
              value:
                getTranslationDetails(translationDetails, activeTab)
                  ?.description || "",
              fieldId: `translate-${activeTab}-update-blog-description`,
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

export default BlogPostForm;
