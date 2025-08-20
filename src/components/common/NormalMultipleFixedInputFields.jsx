import { globalStyleObj } from "@/app/assets/styles";
import React from "react";
import {
  LabelText,
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
  NormalTextInputField,
} from "..";
import { Skeleton } from "../ui/skeleton";

const NormalMultipleFixedInputFields = ({
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
  handleTextInputChange,
  handleTextEditorInputChange,
  translateField = false,
  extraContainerClasses = "",
  cards = [],
}) => {
  // Handle Image Change
  const passSelectedImageId = (fieldName, id) => {
    if (id) {
      handleImageChange(fieldName, id);
    } else {
      handleImageChange(fieldName, "");
    }
  };

  // Generate Image Input Field
  const getImageInputField = (i, cardImageId, hideInOtherLang = false) => {
    if (!cardImageId) {
      return null;
    }

    if (hideInOtherLang) {
      return (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          fieldId={cardImageId}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={(id) => passSelectedImageId(cardImageId, id)}
          selectedFileId={stateDetails?.[cardImageId] || ""}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // extraContainerClasses="mb-5"
        />
      );
    }
  };

  // Generate Text Input || Text Area Field
  const getTextInputField = (
    i,
    cardInputTextId,
    placeHolder = null,
    extraInfo = "",
    isTextArea = false,
    hideInOtherLang = false
  ) => {
    if (!cardInputTextId) {
      return null;
    }

    if (hideInOtherLang) {
      return (
        <NormalTextInputField
          isFetching={isFetching}
          isTextArea={isTextArea}
          fieldId={cardInputTextId}
          fieldName={cardInputTextId}
          placeholderText={placeHolder || "Text"}
          inputValue={stateDetails?.[cardInputTextId] || ""}
          onChangeTextInputField={handleTextInputChange}
          // extraContainerClasses="mt-5"
          extraFiledInfo={extraInfo}
          translateField={true}
        />
      );
    }
  };

  // Generate Text Editor Field
  const getTextEditorInputField = (
    i,
    cardTextEditorId,
    cardTextEditorPlaceholder,
    extraInfo = "",
    hideInOtherLang = false
  ) => {
    if (!cardTextEditorId) {
      return null;
    }

    if (hideInOtherLang) {
      return (
        <NormalTextEditorInputFiled
          isFetching={isFetching}
          fieldId={cardTextEditorId}
          fieldName={cardTextEditorId}
          placeholderText={cardTextEditorPlaceholder || "TEXT"}
          inputValue={stateDetails?.[cardTextEditorId] || ""}
          onChangeTextEditorFiled={handleTextEditorInputChange}
          translateField={true}
          extraFiledInfo={extraInfo}
        />
      );
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

      <ul className={`flex flex-col gap-5 w-full lg:max-w-[500px]`}>
        {cards.map((card, cardIndex) => (
          <li
            key={card.card_id}
            className="border border-dashed border-light-weight-400 p-2 flex flex-col gap-3"
          >
            {card.types.map((type, index) => (
              <React.Fragment key={`fileds-${index + 1}`}>
                {type === "IMAGE" &&
                  getImageInputField(
                    cardIndex,
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.ids_name?.[index]
                    ] || null,
                    cards?.[cardIndex]?.is_hidden?.[index] || false
                  )}

                {type === "TEXT" &&
                  getTextInputField(
                    index,
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.ids_name?.[index]
                    ] || null,
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.placeholders_name?.[index]
                    ] || "Default Placeholder",
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.extra_info?.[index]
                    ] || "",
                    false,
                    cards?.[cardIndex]?.is_hidden?.[index] || false
                  )}

                {type === "TEXT_AREA" &&
                  getTextInputField(
                    index,
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.ids_name?.[index]
                    ] || null,
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.placeholders_name?.[index]
                    ] || "Default Placeholder",
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.extra_info?.[index]
                    ] || "",
                    true,
                    cards?.[cardIndex]?.is_hidden?.[index] || false
                  )}

                {type === "TEXT_EDITOR" &&
                  getTextEditorInputField(
                    cardIndex,
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.ids_name?.[index]
                    ] || null,
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.placeholders_name?.[index]
                    ] || "Default Placeholder",
                    cards?.[cardIndex]?.[
                      cards?.[cardIndex]?.extra_info?.[index]
                    ] || "",
                    cards?.[cardIndex]?.is_hidden?.[index] || false
                  )}
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NormalMultipleFixedInputFields;
