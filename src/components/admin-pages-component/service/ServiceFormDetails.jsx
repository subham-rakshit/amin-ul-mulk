"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  SubmitButton,
} from "@/components";
import dynamic from "next/dynamic";
import { GoLaw } from "react-icons/go";

const JoditEditor = dynamic(
  () => import("jodit-react"),
  { ssr: false } // This is key
);

const ServiceFormDetails = ({
  userId,
  adminRole,
  permissionsList,
  itemDetails,
  isItemDetailsExist,
  isSubmitting,
  hasChanges,
  submitFunction,
  control,
  errors,
  filesList,
  allFiles,
  selectedFileType,
  onChangeImage,
  paginationDetails,
  searchValue,
  watchDescription,
  setValue,
  watchedTags,
  addTag,
  removeTag,
  theme,
  colorGrade,
}) => {
  return (
    <form onSubmit={submitFunction} className={`p-3 sm:p-5`}>
      {/* Service Name */}
      <CommonTextInputField
        fieldName="service_name"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-service-name" : "service-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.service_name}
        placeholderText="Service Name"
        labelName="Service Name"
        labelStatus={true}
        translateField={isItemDetailsExist}
      />

      {/* Slug */}
      <CommonTextInputField
        fieldName="slug"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-service-slug" : "service-slug"}`}
        control={control}
        errors={errors}
        errorsType={errors?.slug}
        placeholderText="Slug"
        labelName="Slug"
        labelStatus={true}
        extraClass="mt-5"
      />

      {/* Order Number */}
      <CommonTextInputField
        fieldName="order_number"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-service-order-num" : "service-order-num"}`}
        control={control}
        errors={errors}
        errorsType={errors?.order_number}
        placeholderText="Oder Number"
        labelName="Order Number"
        labelStatus={false}
        extraClass="mt-5"
        extraInformationText="Put higher number if you want to show the service on top of the list in front-end."
      />

      {/* Card Short Description */}
      <CommonTextAreaField
        fieldName="card_short_description"
        fieldId={`${isItemDetailsExist ? "update-service-card-short-description" : "service-card-short-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.card_short_description}
        placeholderText="Card Short Description"
        labelName="Card Short Description"
        labelStatus={false}
        extraClass="mt-5"
        translateField={isItemDetailsExist}
      />

      {/* Card Long Description */}
      <CommonTextAreaField
        fieldName="card_long_description"
        fieldId={`${isItemDetailsExist ? "update-service-card-long-description" : "service-card-long-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.card_long_description}
        placeholderText="Card Long Description"
        labelName="Card Long Description"
        labelStatus={false}
        extraClass="mt-5"
        translateField={isItemDetailsExist}
      />

      {/* Card Icon */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Card Icon"
          htmlForId={`${isItemDetailsExist ? "update-service-card-icon" : "service-card-icon"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isItemDetailsExist ? (
            <FileReuseDialog
              htmlId="service-card-icon"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("card_icon", id)}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-service-card-icon"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("card_icon", id)}
              selectedBannerFileId={itemDetails?.card_icon?._id ?? ""}
              selectedBannerFileName={itemDetails?.card_icon?.fileName ?? ""}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.card_icon && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.card_icon.message}
            </p>
          )}
        </div>
      </div>

      {/* Card Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Card Image"
          htmlForId={`${isItemDetailsExist ? "update-service-card-image" : "service-card-image"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isItemDetailsExist ? (
            <FileReuseDialog
              htmlId="service-card-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("card_image", id)}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-service-card-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("card_image", id)}
              selectedBannerFileId={itemDetails?.card_image?._id ?? ""}
              selectedBannerFileName={itemDetails?.card_image?.fileName ?? ""}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.card_image && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.card_image.message}
            </p>
          )}
        </div>
      </div>

      {/* Banner Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Banner Image"
          htmlForId={`${isItemDetailsExist ? "update-service-banner-image" : "service-banner-image"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isItemDetailsExist ? (
            <FileReuseDialog
              htmlId="service-banner-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("banner_image", id)}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-service-banner-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("banner_image", id)}
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

      {/* Cover Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Cover Image"
          htmlForId={`${isItemDetailsExist ? "update-service-cover-image" : "service-cover-image"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isItemDetailsExist ? (
            <FileReuseDialog
              htmlId="service-cover-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("cover_image", id)}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-service-cover-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("cover_image", id)}
              selectedBannerFileId={itemDetails?.cover_image?._id ?? ""}
              selectedBannerFileName={itemDetails?.cover_image?.fileName ?? ""}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.cover_image && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.cover_image.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Detaild Description"
          htmlForId={`${isItemDetailsExist ? "update-service-detaild-description" : "service-detaild-description"}`}
          star={false}
          translateField={isItemDetailsExist}
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
            id={`${isItemDetailsExist ? "update-service-detaild-description" : "service-detaild-description"}`}
            value={watchDescription}
            name="description"
            onBlur={(newContent) => {
              setValue("detailed_description", newContent);
            }}
          />
        </div>
      </div>

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="meta_title"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-service-meta-title" : "service-meta-title"}`}
        control={control}
        errors={errors}
        errorsType={errors?.meta_title}
        placeholderText="Meta Title"
        labelName="Meta Title"
        labelStatus={false}
        extraClass="mt-5"
      />

      {/* Meta Key Words */}
      <CommonTextInputField
        fieldName="meta_keywords"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-service-meta-keywords" : "service-meta-keywords"}`}
        control={control}
        errors={errors}
        errorsType={errors?.meta_keywords}
        placeholderText="Enter Meta Keywords"
        labelName="Meta Keywords"
        labelStatus={false}
        extraClass="mt-5"
        extraInformationText="Separate keywords with comma (,) Don't use space."
      />

      {/* Meta Image */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Meta Image"
          htmlForId={`${isItemDetailsExist ? "update-service-meta-image" : "service-meta-image"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isItemDetailsExist ? (
            <FileReuseDialog
              htmlId="service-meta-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("meta_image", id)}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-service-meta-image"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={() => onChangeImage("meta_image", id)}
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
        fieldId={`${isItemDetailsExist ? "update-service-meta-description" : "service-meta-description"}`}
        control={control}
        errors={errors}
        errorsType={errors?.meta_description}
        placeholderText="Meta Description"
        labelName="Meta Description"
        labelStatus={false}
        extraClass="mt-5"
      />

      <SubmitButton
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
        isDetailsExist={isItemDetailsExist}
        colorGrade={colorGrade}
        label={isItemDetailsExist ? "Update Service" : "Create Service"}
        icon={<GoLaw />}
      />
    </form>
  );
};

export default ServiceFormDetails;
