import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
  LabelText,
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
} from "..";
import { globalStyleObj } from "@/app/assets/styles";

const NormalImageAndTextEditorCombinationInputFields = ({
  stateDetails,
  isFetching = false,
  allFilesResponse,
  labelText = "",
  fieldId = "",
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
  handleImageChange,
  handleTextEditorInputChange,
  isHideInOtherLanguages = false,
  translateField = false,
  extraContainerClasses = "",
  cards = [],
}) => {
  // Handle Image Change
  const getSelectedBannerImageId = (fieldName, id) => {
    if (id) {
      handleImageChange(fieldName, id);
    } else {
      handleImageChange(fieldName, "");
    }
  };

  return (
    <div
      className={`${globalStyleObj.commonSettingInputContainerClass} ${extraContainerClasses}`}
    >
      {isFetching ? (
        <Skeleton className="w-[150px] h-[30px] rounded-md" />
      ) : (
        <LabelText
          text={labelText}
          htmlForId={fieldId}
          translateField={translateField}
        />
      )}

      <ul className={`flex flex-col gap-2 w-full lg:max-w-[500px]`}>
        {/* Repeatable Cards */}
        {cards.length > 0 &&
          cards.map((card, index) => (
            <li
              key={card.cardId}
              className="border border-dashed border-light-weight-400 p-2"
            >
              {/* Stats Image */}
              {isHideInOtherLanguages && (
                <NormalBrowseFileInputFiled
                  isFetching={isFetching}
                  fieldId={card.imageFieldId}
                  allFilesResponse={allFilesResponse}
                  searchValue={searchValue}
                  selectedFileType={selectedFileType}
                  onChangeImageFunction={(id) =>
                    getSelectedBannerImageId(card.imageFieldId, id)
                  }
                  selectedFileId={stateDetails?.[card.imageFieldId] || ""}
                  adminRole={adminRole}
                  permissionsList={permissionsList}
                  extraContainerClasses="mb-5"
                />
              )}

              {/* Text */}
              <NormalTextEditorInputFiled
                isFetching={isFetching}
                fieldId={card.textFieldId}
                fieldName={card.textFieldId}
                placeholderText={card.placeholder}
                inputValue={stateDetails?.[card.textFieldId] || ""}
                onChangeTextEditorFiled={handleTextEditorInputChange}
                translateField={true}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NormalImageAndTextEditorCombinationInputFields;
