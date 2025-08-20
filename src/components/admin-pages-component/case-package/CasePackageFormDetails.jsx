"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  CommonTextAreaField,
  CommonTextInputField,
  FileReuseDialog,
  LabelText,
  RepeatableOneInputField,
  SubmitButton,
} from "@/components";
import { MdPriceChange } from "react-icons/md";

const CasePackageFormDetails = ({
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
  handleAddRepeatableField,
  handleOnChangeRepeatableFields,
  handleRemoveRepeatableField,
  paginationDetails,
  searchValue,
  formData,
  // watchDescription,
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
        fieldName="case_package_name"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-case-package-name" : "case-package-name"}`}
        control={control}
        errors={errors}
        errorsType={errors?.case_package_name}
        placeholderText="Package Name"
        labelName="Package Name"
        labelStatus={true}
        translateField={isItemDetailsExist}
      />

      {/* Slug */}
      <CommonTextInputField
        fieldName="slug"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-case-package-slug" : "case-package-slug"}`}
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
        fieldId={`${isItemDetailsExist ? "update-case-package-order-num" : "case-package-order-num"}`}
        control={control}
        errors={errors}
        errorsType={errors?.order_number}
        placeholderText="Oder Number"
        labelName="Order Number"
        labelStatus={false}
        extraClass="mt-5"
        extraInformationText="Put higher number if you want to show the service on top of the list in front-end."
      />

      {/* Package Price */}
      <CommonTextInputField
        fieldName="package_price"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-case-package-price" : "case-package-package-price"}`}
        control={control}
        errors={errors}
        errorsType={errors?.package_price}
        placeholderText="Price"
        labelName="Price"
        labelStatus={true}
        extraClass="mt-5"
        translateField={isItemDetailsExist}
      />

      {/* Billing Cycle */}
      <CommonTextInputField
        fieldName="billing_cycle"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-case-package-billing-cycle" : "case-package-billing-cycle"}`}
        control={control}
        errors={errors}
        errorsType={errors?.billing_cycle}
        placeholderText="Billing Cycle"
        labelName="Billing Cycle"
        labelStatus={true}
        extraClass="mt-5"
        translateField={isItemDetailsExist}
        extraInformationText="Put Monthy, Yearly, .. cycle text."
      />

      {/* Features Icon */}
      <div className={`mt-5 ${globalStyleObj.commonInputContainerClass}`}>
        <LabelText
          text="Features Icon"
          htmlForId={`${isItemDetailsExist ? "update-case-package-features-icon" : "case-package-features-icon"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isItemDetailsExist ? (
            <FileReuseDialog
              htmlId="case-package-features-icon"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("features_icon", id)}
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          ) : (
            <FileReuseDialog
              htmlId="update-case-package-features-icon"
              userId={userId}
              filesList={filesList}
              allFiles={allFiles}
              paginationDetails={paginationDetails}
              searchValue={searchValue}
              selectedFileType={selectedFileType}
              onChangeBannerImage={(id) => onChangeImage("features_icon", id)}
              selectedBannerFileId={itemDetails?.features_icon?._id ?? ""}
              selectedBannerFileName={
                itemDetails?.features_icon?.fileName ?? ""
              }
              adminRole={adminRole}
              permissionsList={permissionsList}
            />
          )}
          {errors && errors.features_icon && (
            <p className="text-red-500 text-[13px] font-poppins-rg">
              {errors.features_icon.message}
            </p>
          )}
        </div>
      </div>

      {/* Features Repeater */}
      <RepeatableOneInputField
        formData={formData}
        labelText="Features"
        fieldId="case-package-features"
        translateField={isItemDetailsExist}
        repeatableKeyname="package_features"
        repeatableKeys={["labels"]}
        addNewField={handleAddRepeatableField}
        removeField={handleRemoveRepeatableField}
        onChangeField={handleOnChangeRepeatableFields}
        placeHolderText="Feature Text"
        extraContainerClasses="mt-5"
        inputBoxMaxWidth="max-w-[800px]"
        translateField={isItemDetailsExist}
      />

      {/* Details Button Label */}
      <CommonTextInputField
        fieldName="details_button_label"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-case-package-details-btn-label" : "case-package-details-btn-label"}`}
        control={control}
        errors={errors}
        errorsType={errors?.details_button_label}
        placeholderText="Details Button Text"
        labelName="Details Button Text"
        labelStatus={false}
        extraClass="mt-5"
        translateField={isItemDetailsExist}
      />

      {/* Selection Button Label */}
      <CommonTextInputField
        fieldName="selection_button_label"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-case-package-selection-btn-label" : "case-package-selection-btn-label"}`}
        control={control}
        errors={errors}
        errorsType={errors?.selection_button_label}
        placeholderText="Selection Button Text"
        labelName="Selection Button Text"
        labelStatus={false}
        extraClass="mt-5"
        translateField={isItemDetailsExist}
      />

      {/* Meta Title */}
      <CommonTextInputField
        fieldName="meta_title"
        fieldType="text"
        fieldId={`${isItemDetailsExist ? "update-case-package-meta-title" : "case-package-meta-title"}`}
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
        fieldId={`${isItemDetailsExist ? "update-case-package-meta-keywords" : "case-package-meta-keywords"}`}
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
          htmlForId={`${isItemDetailsExist ? "update-case-package-meta-image" : "case-package-meta-image"}`}
          star={false}
        />
        <div className="flex flex-col gap-2 w-full max-w-[800px]">
          {!isItemDetailsExist ? (
            <FileReuseDialog
              htmlId="case-package-meta-image"
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
              htmlId="update-case-package-meta-image"
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
        fieldId={`${isItemDetailsExist ? "update-case-package-meta-description" : "case-package-meta-description"}`}
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
        label={isItemDetailsExist ? "Update Package" : "Create Package"}
        icon={<MdPriceChange />}
      />
    </form>
  );
};

export default CasePackageFormDetails;
