import { NormalBrowseFileInputFiled, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const HomeServicesSectionFormField = ({
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
      onChangeImage("home-section-5-services-image", id);
    } else {
      onChangeImage("home-section-5-services-image", "");
    }
  };

  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="home-section-5-services-sub-heading"
        fieldName="home-section-5-services-sub-heading"
        placeholderText="Sub Heading"
        inputValue={stateDetails?.["home-section-5-services-sub-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-5-services-heading"
        fieldName="home-section-5-services-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-5-services-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
        extraContainerClasses="mt-5"
      />

      {/* Description */}
      <NormalTextInputField
        isFetching={isFetching}
        isTextArea={true}
        labelText="Description"
        fieldId="home-section-5-services-description"
        fieldName="home-section-5-services-description"
        placeholderText="Description"
        inputValue={stateDetails?.["home-section-5-services-description"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Survice Banner Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Image"
          fieldId="home-section-5-services-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={getSelectedBannerImageId}
          selectedFileId={stateDetails?.["home-section-5-services-image"] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}
    </>
  );
};

export default HomeServicesSectionFormField;
