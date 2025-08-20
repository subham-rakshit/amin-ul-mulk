"use client";

import { globalStyleObj } from "@/app/assets/styles";
import React from "react";
import { MdDelete } from "react-icons/md";
import {
  LabelText,
  NormalBrowseFileInputFiled,
  NormalTextEditorInputFiled,
  NormalTextInputField,
} from "..";
import { Skeleton } from "../ui/skeleton";

const NormalMultipleInputStackFilds = ({
  stateDetails,
  isFetching = false,
  allFilesResponse,
  labelText = "",
  fieldId = "",
  fieldKey = "",
  searchValue,
  selectedFileType,
  adminRole,
  permissionsList,
  addMultiValueRepeaterChange,
  removeMultiValueRepeaterChange,
  updateMultiValueRepeaterChange,
  translateField = false,
  extraContainerClasses = "",
  filedStructure = [],
  dataStructure = {},
  placeholderTexts = [],
  is_hidden = [],
  colorGrade = { bgColor: "", hoverBgColor: "", textColor: "", hexCode: "" },
}) => {
  // Generate Image Input Field
  const getImageInputField = (
    itemIndex,
    internalFieldKey,
    hideInOtherLang = false
  ) => {
    const itemData = stateDetails?.[fieldKey]?.[itemIndex] || {};

    const imageId = itemData?.[internalFieldKey] || "";

    if (hideInOtherLang) {
      return (
        <NormalBrowseFileInputFiled
          isFetching={isFetching}
          fieldId={`multi-image-filed-${itemIndex}`}
          allFilesResponse={allFilesResponse}
          searchValue={searchValue}
          selectedFileType={selectedFileType}
          onChangeImageFunction={(id) =>
            updateMultiValueRepeaterChange(
              fieldKey,
              itemIndex,
              internalFieldKey,
              id
            )
          }
          selectedFileId={imageId}
          adminRole={adminRole}
          permissionsList={permissionsList}
          // extraContainerClasses="mb-5"
        />
      );
    }
  };

  // Generate Text Input || Text Area Field
  const getTextInputField = (
    itemIndex,
    internalFieldKey,
    placeHolder = "",
    isTextArea = false,
    hideInOtherLang = false
  ) => {
    const itemData = stateDetails?.[fieldKey]?.[itemIndex] || {};
    const value = itemData?.[internalFieldKey] || "";

    if (hideInOtherLang) {
      return (
        <NormalTextInputField
          isFetching={isFetching}
          isTextArea={isTextArea}
          fieldId={
            isTextArea
              ? `multi-text-area-filed-${itemIndex}`
              : `multi-text-filed-${itemIndex}`
          }
          fieldName={`multi-text-filed-${itemIndex}`}
          placeholderText={placeHolder || "Text"}
          inputValue={value}
          onChangeTextInputField={(e) =>
            updateMultiValueRepeaterChange(
              fieldKey,
              itemIndex,
              internalFieldKey,
              e.target.value
            )
          }
          // extraContainerClasses="mt-5"
          translateField={true}
        />
      );
    }
  };

  // Generate Text Editor Field
  const getTextEditorInputField = (
    itemIndex,
    internalFieldKey,
    placeHolder = "",
    hideInOtherLang = false
  ) => {
    const itemData = stateDetails?.[fieldKey]?.[itemIndex] || {};
    const value = itemData?.[internalFieldKey] || "";

    if (hideInOtherLang) {
      return (
        <NormalTextEditorInputFiled
          isFetching={isFetching}
          fieldId={`multi-text-editor-filed-${itemIndex}`}
          fieldName={`multi-text-editor-filed-${itemIndex}`}
          placeholderText={placeHolder || "TEXT"}
          inputValue={value}
          onChangeTextEditorFiled={(newContent) =>
            updateMultiValueRepeaterChange(
              fieldKey,
              itemIndex,
              internalFieldKey,
              newContent
            )
          }
          translateField={true}
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
        {/* Multi Repeater Cards */}
        {stateDetails?.[fieldKey]?.length > 0 &&
          stateDetails[fieldKey].map((item, index) => (
            <li
              key={`repated-card-${index + 1}`}
              className="border border-dashed border-light-weight-400 p-2 flex gap-3"
            >
              <div className="w-full flex flex-col gap-3">
                {filedStructure.map((structure, i) => (
                  <React.Fragment
                    key={`main-card-${index + 1}-internal-${i + 1}`}
                  >
                    {structure === "IMAGE" &&
                      getImageInputField(
                        index,
                        Object.keys(dataStructure)[i],
                        is_hidden?.[i] || false
                      )}

                    {structure === "TEXT" &&
                      getTextInputField(
                        index,
                        Object.keys(dataStructure)[i],
                        placeholderTexts[i],
                        false,
                        is_hidden?.[i] || false
                      )}

                    {structure === "TEXT_AREA" &&
                      getTextInputField(
                        index,
                        Object.keys(dataStructure)[i],
                        placeholderTexts[i],
                        true,
                        is_hidden?.[i] || false
                      )}

                    {structure === "TEXT_EDITOR" &&
                      getTextEditorInputField(
                        index,
                        Object.keys(dataStructure)[i],
                        placeholderTexts[i],
                        is_hidden?.[i] || false
                      )}
                  </React.Fragment>
                ))}
              </div>

              <button
                type="button"
                onClick={() => removeMultiValueRepeaterChange(fieldKey, index)}
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#f0525250] flex-shrink-0"
              >
                <MdDelete size={20} className="text-red-500" />
              </button>
            </li>
          ))}

        {/* Add Button */}
        <li className="w-full">
          <button
            type="button"
            onClick={() => addMultiValueRepeaterChange(fieldKey, dataStructure)}
            className={`w-full px-5 py-2 text-[14px] font-poppins-rg ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} ${stateDetails?.[fieldKey]?.length > 0 ? "mt-2" : ""} hover:text-white transition-300 rounded-sm`}
          >
            Add Multi Items
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NormalMultipleInputStackFilds;
