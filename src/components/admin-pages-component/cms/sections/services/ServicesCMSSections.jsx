import {
  ServicesBannerSectionFormFields,
  ServicesListingSectionFormFields,
} from "@/components";

const ServicesCMSSections = ({
  activeTab,
  isFetching,
  formData,
  selectedTab,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleTextInputChange,
  handleImageChange,
  adminRole,
  permissionsList,
}) => {
  return (
    <>
      {selectedTab === "section-1" && (
        <ServicesBannerSectionFormFields
          activeLang={activeTab}
          isFetching={isFetching}
          labelText="Banner Image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          handleTextInputChange={handleTextInputChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {selectedTab === "section-2" && (
        <ServicesListingSectionFormFields
          isFetching={isFetching}
          handleTextInputChange={handleTextInputChange}
          stateDetails={formData}
        />
      )}
    </>
  );
};

export default ServicesCMSSections;

// ServicesCMSSections
