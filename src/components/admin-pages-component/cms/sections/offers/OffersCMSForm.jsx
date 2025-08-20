import {
  OffersBannerSectionFormFields,
  OffersInfoSectionFormFields,
} from "@/components";

const OffersCMSForm = ({
  activeTab,
  isFetching,
  formData,
  selectedTab,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleTextEditorInputChange,
  handleImageChange,
  adminRole,
  permissionsList,
}) => {
  return (
    <>
      {/* {selectedTab === "section-1" && (
        <OffersBannerSectionFormFields
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )} */}

      {selectedTab === "section-1" && (
        <OffersInfoSectionFormFields
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
          handleTextEditorInputChange={handleTextEditorInputChange}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}
    </>
  );
};

export default OffersCMSForm;
