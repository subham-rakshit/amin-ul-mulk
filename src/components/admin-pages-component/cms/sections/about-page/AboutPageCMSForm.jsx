import {
  AboutSectionFormFields,
  BannerSectionFormFields,
  WhyChooseUsSectionFormFields,
} from "@/components";

const AboutPageCMSForm = ({
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
  colorGrade,
}) => {
  return (
    <>
      {selectedTab === "section-1" && (
        <BannerSectionFormFields
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
        <AboutSectionFormFields
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          handleTextInputChange={handleTextInputChange}
          handleTextEditorInputChange={handleTextEditorInputChange}
          handleImageChange={handleImageChange}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {selectedTab === "section-3" && (
        <WhyChooseUsSectionFormFields
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          handleTextInputChange={handleTextInputChange}
          handleTextEditorInputChange={handleTextEditorInputChange}
          onChangeImage={handleImageChange}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {/* {selectedTab === "section-4" && (
        <MessageSectionFormFields
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          handleTextInputChange={handleTextInputChange}
          onChangeImage={handleImageChange}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )} */}
    </>
  );
};

export default AboutPageCMSForm;
