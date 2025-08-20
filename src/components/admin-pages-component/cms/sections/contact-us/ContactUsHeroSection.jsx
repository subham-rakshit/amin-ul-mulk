"use client";

import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const ContactUsHeroSection = ({
  activeLang,
  isFetching,
  labelText,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  handleTextInputChange,
  stateDetails,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  const getSelectedBannerImageId = (id) => {
    if (id) {
      onChangeImage("contact-us-section-1-banner-image", id);
    } else {
      onChangeImage("contact-us-section-1-banner-image", "");
    }
  };

  return (
    <>
      {/* Banner Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Banner Image"
          fieldId="contact-us-section-1-banner-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedBannerImageId}
          selectedFileId={
            stateDetails?.["contact-us-section-1-banner-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          infoText="Recommended size: 1300 x 650px"
        />
      )}

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="contact-us-section-1-heading"
        fieldName="contact-us-section-1-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["contact-us-section-1-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default ContactUsHeroSection;
