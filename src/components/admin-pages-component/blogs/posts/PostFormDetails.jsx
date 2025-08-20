"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  SubmitButton,
} from "@/components";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";
import { BiNews } from "react-icons/bi";

const JoditEditor = dynamic(
  () => import("jodit-react"),
  { ssr: false } // This is key
);

const PostFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  itemDetails,
  isPostDetailsExist,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  categoryList,
  filesList,
  allFiles,
  selectedFileType,
  onChangeImageFiled,
  paginationDetails,
  searchValue,
  watchDescription,
  setValue,
  theme,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Blog Title */}
      <CommonTextInputField
        fieldName="title"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-title" : "blog-title"}`}
        control={control}
        errors={errors}
        errorsType={errors?.title}
        placeholderText="Enter Blog Title"
        labelName="Title"
        labelStatus={true}
        translateField={isPostDetailsExist}
      />

      {/* Slug */}
      <CommonTextInputField
        fieldName="slug"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-slug" : "blog-slug"}`}
        control={control}
        errors={errors}
        errorsType={errors?.slug}
        placeholderText="Enter Slug"
        labelName="Slug"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Banner (1300 x 650) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Banner (1300 x 650)"
          htmlForId={`${isPostDetailsExist ? "update-blog-banner-img" : "blog-banner-img"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPostDetailsExist ? (
            <FileReuseDialog
              htmlId="blog-banner-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("banner_image", id)
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-blog-banner-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("banner_image", id)
              }
              selectedBannerFileId={itemDetails?.banner_image?._id ?? ""}
              selectedBannerFileName={itemDetails?.banner_image?.fileName ?? ""}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.banner_image && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.banner_image.message}
            </p>
          )}
        </div>
      </div>

      {/* Featured Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Featured Image"
          htmlForId={`${isPostDetailsExist ? "update-blog-featured-img" : "blog-featured-img"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPostDetailsExist ? (
            <FileReuseDialog
              htmlId="blog-featured-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("featured_image", id)
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-blog-featured-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("featured_image", id)
              }
              selectedBannerFileId={itemDetails?.featured_image?._id ?? ""}
              selectedBannerFileName={
                itemDetails?.featured_image?.fileName ?? ""
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.featured_image && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.featured_image.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Description"
          htmlForId={`${isPostDetailsExist ? "update-blog-description" : "blog-description"}`}
          star={false}
          translateField={isPostDetailsExist}
        />

        <div className="w-full max-w-[800px] rounded-sm border border-[#000]/20 dark:border-[#fff]/10">
          <JoditEditor
            config={{
              placeholder: "",
              showCharsCounter: false,
              showWordsCounter: false,
              showXPathInStatusbar: false,
              height: 300,
              style: {
                backgroundColor: theme === "light" ? "#ffffff" : "#22262A",
                color: theme === "light" ? "#495057" : "#ced4da",
              },
              toolbarAdaptive: true,
              toolbarButtonSize: "middle",
              toolbar: true,
            }}
            id={`${isPostDetailsExist ? "update-blog-description" : "blog-description"}`}
            value={watchDescription}
            name="description"
            onBlur={(newContent) => {
              setValue("description", newContent);
            }}
          />
        </div>
      </div>

      {/* Small Image Option 1 */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Small Image Option 1"
          htmlForId={`${isPostDetailsExist ? "update-blog-small-img-option-1" : "blog-small-img-option-1"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPostDetailsExist ? (
            <FileReuseDialog
              htmlId="blog-small-img-option-1"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("small_image_option_1", id)
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-blog-small-img-option-1"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("small_image_option_1", id)
              }
              selectedBannerFileId={
                itemDetails?.small_image_option_1?._id ?? ""
              }
              selectedBannerFileName={
                itemDetails?.small_image_option_1?.fileName ?? ""
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.small_image_option_1 && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.small_image_option_1.message}
            </p>
          )}
        </div>
      </div>

      {/* Small Image Option 2 */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Small Image Option 2"
          htmlForId={`${isPostDetailsExist ? "update-blog-small-img-option-2" : "blog-small-img-option-2"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPostDetailsExist ? (
            <FileReuseDialog
              htmlId="blog-small-img-option-2"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("small_image_option_2", id)
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-blog-small-img-option-2"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) =>
                onChangeImageFiled("small_image_option_2", id)
              }
              selectedBannerFileId={
                itemDetails?.small_image_option_2?._id ?? ""
              }
              selectedBannerFileName={
                itemDetails?.small_image_option_2?.fileName ?? ""
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.small_image_option_2 && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.small_image_option_2.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="meta_title"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-meta-title" : "blog-meta-title"}`}
        control={control}
        errors={errors}
        errorsType={errors?.meta_title}
        placeholderText="Enter Meta Title"
        labelName="Meta Title"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Meta Key Words */}
      <CommonTextInputField
        fieldName="meta_keywords"
        fieldType="text"
        fieldId={`${isPostDetailsExist ? "update-blog-meta-keywords" : "blog-meta-keywords"}`}
        control={control}
        errors={errors}
        errorsType={errors?.meta_keywords}
        placeholderText="Enter Meta Keywords"
        labelName="Meta Keywords"
        labelStatus={false}
        extraClass="mt-5"
        extraInformationText="Separate keywords with comma (,) Don't use space."
      />

      {/* Meta Image (200 x 200) */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Image (200 x 200)"
          htmlForId={`${isPostDetailsExist ? "update-blog-meta-img" : "blog-meta-img"}`}
          star={false}
        />

        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isPostDetailsExist ? (
            <FileReuseDialog
              htmlId="blog-meta-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeMetaImage={(id) => onChangeImageFiled("meta_image", id)}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-blog-meta-img"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeMetaImage={(id) => onChangeImageFiled("meta_image", id)}
              selectedBannerFileId={itemDetails?.meta_image?._id ?? ""}
              selectedBannerFileName={itemDetails?.meta_image?.fileName ?? ""}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.meta_image && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.meta_image.message}
            </p>
          )}
        </div>
      </div>

      {/* Meta Description */}
      <CommonTextAreaField
        fieldName="meta_description"
        fieldId={`${isPostDetailsExist ? "update-blog-meta-description" : "blog-meta-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.meta_description}
        labelName="Meta Description"
        labelStatus={false}
        extraClass="mt-5"
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isPostDetailsExist}
        colorGrade={colorGrade}
        label={isPostDetailsExist ? "Update Post" : "Create Post"}
        icon={<BiNews />}
      />
    </form>
  );
};

export default PostFormDetails;
