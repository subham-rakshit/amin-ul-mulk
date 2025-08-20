import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const HomeConsultationSectionFormField = ({
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

  const getSelectedBannerImageId = (id) => {
    if (id) {
      onChangeImage("home-section-6-consultation-image", id);
    } else {
      onChangeImage("home-section-6-consultation-image", "");
    }
  };

  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="home-section-6-consultation-sub-heading"
        fieldName="home-section-6-consultation-sub-heading"
        placeholderText="Sub Heading"
        inputValue={
          stateDetails?.["home-section-6-consultation-sub-heading"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-6-consultation-heading"
        fieldName="home-section-6-consultation-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-6-consultation-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Description */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Description"
        fieldId="home-section-6-consultation-description"
        fieldName="home-section-6-consultation-description"
        placeholderText="Description"
        inputValue={
          stateDetails?.["home-section-6-consultation-description"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Consultation Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId="home-section-6-consultation-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedBannerImageId}
          selectedFileId={
            stateDetails?.["home-section-6-consultation-image"] || ""
          }
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}

      {/* Button Label 1 */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button One Label"
        fieldId="home-section-6-consultation-button-one-label"
        fieldName="home-section-6-consultation-button-one-label"
        placeholderText="Button One Label"
        inputValue={
          stateDetails?.["home-section-6-consultation-button-one-label"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Button Two Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Two Label"
        fieldId="home-section-6-consultation-button-two-label"
        fieldName="home-section-6-consultation-button-two-label"
        placeholderText="Button Two Label"
        inputValue={
          stateDetails?.["home-section-6-consultation-button-two-label"] || ""
        }
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Button Two Link */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Button Value"
          fieldId="home-section-6-consultation-button-two-link"
          fieldName="home-section-6-consultation-button-two-link"
          placeholderText="Phone Number"
          inputValue={
            stateDetails?.["home-section-6-consultation-button-two-link"] || ""
          }
          onChangeTextInputField={handleTextInputChange}
          translateField={false}
          extraFiledInfo="Phone Number (+0000000000)"
          extraContainerClasses="mt-5"
        />
      )}
    </>
  );
};

export default HomeConsultationSectionFormField;
