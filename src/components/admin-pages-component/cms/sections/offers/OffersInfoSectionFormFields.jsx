"use client";

import {
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
  NormalTextInputField,
} from "@/components";
import { useMemo } from "react";

const OffersInfoSectionFormFields = ({
  activeLang,
  isFetching,
  stateDetails,
  handleTextInputChange,
  handleTextEditorInputChange,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  adminRole,
  permissionsList,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en";
  }, [activeLang]);

  const onChangeSpecialOfferImage = (id) => {
    if (id) {
      onChangeImage("special-offer-image", id);
    } else {
      onChangeImage("special-offer-image", "");
    }
  };

  const onChangeOfferEligibiltyImage = (id) => {
    if (id) {
      onChangeImage("offer-eligibility-image", id);
    } else {
      onChangeImage("offer-eligibility-image", "");
    }
  };

  return (
    <>
      {/* Main Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Page Heading"
        fieldId="offers-main-page-heading"
        fieldName="offers-main-page-heading"
        placeholderText="Page Heading"
        inputValue={stateDetails?.["offers-main-page-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        translateField={true}
      />

      <div className="w-full border border-[#00000010] dark:border-[#ffffff10] mt-5" />

      {/* Special Offer Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Special Offer Heading"
        fieldId="special-offer-heading"
        fieldName="special-offer-heading"
        placeholderText="Special Offer Heading"
        inputValue={stateDetails?.["special-offer-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Special Offer Sub Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Special Offer Sub Heading"
        fieldId="special-offer-sub-heading"
        fieldName="special-offer-sub-heading"
        placeholderText="Special Offer Sub Heading"
        inputValue={stateDetails?.["special-offer-sub-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Special Offer Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Special Offer Description"
        fieldId="special-offer-description"
        fieldName="special-offer-description"
        placeholderText="Special Offer Description"
        inputValue={stateDetails?.["special-offer-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Special Offer Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Special Offer Image"
          fieldId="special-offer-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeSpecialOfferImage}
          selectedFileId={stateDetails?.["special-offer-image"] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}

      <div className="w-full border border-[#00000010] dark:border-[#ffffff10] mt-5" />

      {/* Offer Eligibility Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Offer Eligibility Heading"
        fieldId="offer-eligibility-heading"
        fieldName="offer-eligibility-heading"
        placeholderText="Offer Eligibility Heading"
        inputValue={stateDetails?.["offer-eligibility-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Offer Eligibility Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Offer Eligibility Description"
        fieldId="offer-eligibility-description"
        fieldName="offer-eligibility-description"
        placeholderText="Offer Eligibility Description"
        inputValue={stateDetails?.["offer-eligibility-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Offer Eligibility Note Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Offer Eligibility Note Heading"
        fieldId="offer-eligibility-note-heading"
        fieldName="offer-eligibility-note-heading"
        placeholderText="Offer Eligibility Note Heading"
        inputValue={stateDetails?.["offer-eligibility-note-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Offer Eligibility Note Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Offer Eligibility Note Description"
        fieldId="offer-eligibility-note-description"
        fieldName="offer-eligibility-note-description"
        placeholderText="Offer Eligibility Note Description"
        inputValue={stateDetails?.["offer-eligibility-note-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Offer Eligibility Image */}
      {isHideInOtherLanguages && (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          labelText="Offer Eligibility Image"
          fieldId="offer-eligibility-image"
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={onChangeOfferEligibiltyImage}
          selectedFileId={stateDetails?.["offer-eligibility-image"] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          extraContainerClasses="mt-5"
        />
      )}

      <div className="w-full border border-[#00000010] dark:border-[#ffffff10] mt-5" />

      {/* Other Offer Heading */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Other Offer Heading"
        fieldId="other-offer-heading"
        fieldName="other-offer-heading"
        placeholderText="Other Offer Heading"
        inputValue={stateDetails?.["other-offer-heading"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Other Offer Description */}
      <NormalTextEditorInputFiled
        isFetching={isFetching}
        labelText="Other Offer Description"
        fieldId="other-offer-description"
        fieldName="other-offer-description"
        placeholderText="Other Offer Description"
        inputValue={stateDetails?.["other-offer-description"] || ""}
        onChangeTextEditorFiled={handleTextEditorInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      <div className="w-full border border-[#00000010] dark:border-[#ffffff10] mt-5" />

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId="offers-button-label"
        fieldName="offers-button-label"
        placeholderText="Label"
        inputValue={stateDetails?.["offers-button-label"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />

      {/* Button Link */}
      {isHideInOtherLanguages && (
        <NormalTextInputField
          isFetching={isFetching}
          labelText="Button Link"
          fieldId="offers-button-link"
          fieldName="offers-button-link"
          placeholderText="Link"
          inputValue={stateDetails?.["offers-button-link"] || ""}
          onChangeTextInputField={handleTextInputChange}
          extraFiledInfo="Redirection path"
          extraContainerClasses="mt-5"
        />
      )}
    </>
  );
};

export default OffersInfoSectionFormFields;
