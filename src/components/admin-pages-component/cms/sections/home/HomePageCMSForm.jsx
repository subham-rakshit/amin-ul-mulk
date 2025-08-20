import {
  GetInTouchFiledSection,
  HomeAboutUsSectionFormField,
  HomeAttorneysSectionFormField,
  HomeBannerSectionFormFields,
  HomeConsultationSectionFormField,
  HomeDepartmentsSectionFormField,
  HomeNewsSectionFormField,
  HomePricingSectionFormField,
  HomeServicesSectionFormField,
  HomeStatsSectionFormField,
  HomeTestimonialSectionFormField,
} from "@/components";

const HomePageCMSForm = ({
  activeTab,
  isFetching,
  formData,
  selectedTab,
  allFilesResponse,
  searchValue,
  selectedFileType,
  handleSwitchChange,
  handleTextInputChange,
  handleTextEditorInputChange,
  handleImageChange,
  addOnlyValueRepeaterChange,
  removeOnlyValueRepeaterChange,
  updateOnlyValueRepeaterChange,
  addMultiValueRepeaterChange,
  removeMultiValueRepeaterChange,
  updateMultiValueRepeaterChange,
  adminRole,
  permissionsList,
  colorGrade,
}) => {
  return (
    <>
      {/* Banner Section */}
      {selectedTab === "section-1" && (
        <HomeBannerSectionFormFields
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          handleTextInputChange={handleTextInputChange}
          // handleTextEditorInputChange={handleTextEditorInputChange}
          addOnlyValueRepeaterChange={addOnlyValueRepeaterChange}
          removeOnlyValueRepeaterChange={removeOnlyValueRepeaterChange}
          updateOnlyValueRepeaterChange={updateOnlyValueRepeaterChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
          colorGrade={colorGrade}
        />
      )}

      {/* About us Section */}
      {selectedTab === "section-2" && (
        <HomeAboutUsSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          handleTextInputChange={handleTextInputChange}
          handleTextEditorInputChange={handleTextEditorInputChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {/* Stats Section */}
      {selectedTab === "section-3" && (
        <HomeStatsSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          handleTextInputChange={handleTextInputChange}
          handleTextEditorInputChange={handleTextEditorInputChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
        />
      )}

      {/* Prices Section */}
      {selectedTab === "section-4" && (
        <HomePricingSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
        />
      )}

      {/* Our Services Section */}
      {selectedTab === "section-5" && (
        <HomeServicesSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
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

      {/* Consultation Section */}
      {selectedTab === "section-6" && (
        <HomeConsultationSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
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

      {/* Attorneys Section */}
      {selectedTab === "section-7" && (
        <HomeAttorneysSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          handleTextInputChange={handleTextInputChange}
          addMultiValueRepeaterChange={addMultiValueRepeaterChange}
          removeMultiValueRepeaterChange={removeMultiValueRepeaterChange}
          updateMultiValueRepeaterChange={updateMultiValueRepeaterChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
          colorGrade={colorGrade}
        />
      )}

      {/* Departments Section */}
      {selectedTab === "section-8" && (
        <HomeDepartmentsSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          handleTextInputChange={handleTextInputChange}
          addMultiValueRepeaterChange={addMultiValueRepeaterChange}
          removeMultiValueRepeaterChange={removeMultiValueRepeaterChange}
          updateMultiValueRepeaterChange={updateMultiValueRepeaterChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
          colorGrade={colorGrade}
        />
      )}

      {/* Testimonial Section */}
      {selectedTab === "section-9" && (
        <HomeTestimonialSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
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

      {/* News Section */}
      {selectedTab === "section-10" && (
        <HomeNewsSectionFormField
          activeLang={activeTab}
          isFetching={isFetching}
          stateDetails={formData}
          handleTextInputChange={handleTextInputChange}
          handleSwitchChange={handleSwitchChange}
        />
      )}

      {/* Contact Us Section */}
      {selectedTab === "section-11" && (
        <GetInTouchFiledSection
          activeLang={activeTab}
          isFetching={isFetching}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImage={handleImageChange}
          handleTextInputChange={handleTextInputChange}
          stateDetails={formData}
          adminRole={adminRole}
          permissionsList={permissionsList}
          imageKey="home-section-11-contact-image"
          headingKey="home-section-11-contact-heading"
        />
      )}
    </>
  );
};

export default HomePageCMSForm;
