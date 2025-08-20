import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const HomeTestimonialSectionFormField = ({
  activeLang,
  isFetching,
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

  const getTestimonialImageId = (id) => {
    if (id) {
      onChangeImage("home-section-9-testimonial-image", id);
    } else {
      onChangeImage("home-section-9-testimonial-image", "");
    }
  };

  const getTestimonialLogoImageId = (id) => {
    if (id) {
      onChangeImage("home-section-9-testimonial-logo-image", id);
    } else {
      onChangeImage("home-section-9-testimonial-logo-image", "");
    }
  };

  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="home-section-9-testimonial-sub-heading"
        fieldName="home-section-9-testimonial-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["home-section-9-testimonial-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-9-testimonial-heading"
        fieldName="home-section-9-testimonial-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-9-testimonial-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId="home-section-9-testimonial-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getTestimonialImageId}
          selectedFileId={
            stateDetails?.["home-section-9-testimonial-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}

      {/* Logo */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Logo"
          fieldId="home-section-9-testimonial-logo-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getTestimonialLogoImageId}
          selectedFileId={
            stateDetails?.["home-section-9-testimonial-logo-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}

      {/* Logo Text */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Logo Text"
        fieldId="home-section-9-testimonial-logo-text"
        fieldName="home-section-9-testimonial-logo-text"
        placeholderText="Logo Text"
        inputValue={
          stateDetails?.["home-section-9-testimonial-logo-text"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default HomeTestimonialSectionFormField;
