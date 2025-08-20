import { NormalSwitchInputField, NormalTextInputField } from "@/components";
import { useMemo } from "react";

const HomeNewsSectionFormField = ({
  activeLang,
  isFetching,
  stateDetails,
  handleTextInputChange,
  handleSwitchChange,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  return (
    <>
      {/* Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Sub Heading"
        fieldId="home-section-10-news-sub-heading"
        fieldName="home-section-10-news-sub-heading"
        placeholderText="Sub Heading"
        inputValue={stateDetails?.["home-section-10-news-sub-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      {/* Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Heading"
        fieldId="home-section-10-news-heading"
        fieldName="home-section-10-news-heading"
        placeholderText="Heading"
        inputValue={stateDetails?.["home-section-10-news-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Switch Button */}
      {isHideInOtherLanguages && (
        <NormalSwitchInputField
          isFetching={isFetching}
          labelText="Visible Status"
          fieldId="home-section-10-news-show-status"
          fieldName="home-section-10-news-show-status"
          switchStatus={
            stateDetails?.["home-section-10-news-show-status"] || "0"
          }
          onChangeSwtichState={() =>
            handleSwitchChange("home-section-10-news-show-status")
          }
          extraContainerClasses="mt-5"
          customBodySize="h-[18px] w-[36px]"
          customThumbSize="h-[16px] w-[16px]"
        />
      )}
    </>
  );
};

export default HomeNewsSectionFormField;
