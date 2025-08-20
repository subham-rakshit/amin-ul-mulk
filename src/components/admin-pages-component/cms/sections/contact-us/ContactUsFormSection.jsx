import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const ContactUsFormSection = ({
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

  const getSelectedImageId = (id) => {
    if (id) {
      onChangeImage("contact-us-section-3-form-image", id);
    } else {
      onChangeImage("contact-us-section-3-form-image", "");
    }
  };

  return (
    <>
      {/* Banner Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Map Image"
          fieldId="contact-us-section-3-form-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedImageId}
          selectedFileId={
            stateDetails?.["contact-us-section-3-form-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="contact-us-section-3-heading"
        fieldName="contact-us-section-3-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["contact-us-section-3-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId="contact-us-section-3-button-label"
        fieldName="contact-us-section-3-button-label"
        placeholderText="Button Label"
        inputValue={stateDetails?.["contact-us-section-3-button-label"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default ContactUsFormSection;
