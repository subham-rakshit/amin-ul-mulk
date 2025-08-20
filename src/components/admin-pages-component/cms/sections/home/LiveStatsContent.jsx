"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  LabelText,
  NormalBrowseFileInputFiled,
  NormalTextInputField,
} from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const LiveStatsContent = ({
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
  isHideInOtherLanguages = false,
  translateField = false,
  extraContainerClasses = "",
}) => {
  const [cards, setCards] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

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
              key={card.id}
              className="border border-dashed border-light-weight-400 p-2"
            >
              {/* Stats Image */}
              <NormalBrowseFileInputFiled
                isFetching={isFetching}
                fieldId={`home-section-3-about-us-live-stats-content-image-${card.id}`}
                allFilesResponse={allFilesResponse}
                searchValue={searchValue}
                selectedFileType={selectedFileType}
                onChangeImageFunction={(id) =>
                  getSelectedBannerImageId(
                    `home-section-3-about-us-live-stats-content-image-${card.id}`,
                    id
                  )
                }
                selectedFileId={
                  stateDetails?.[
                    `home-section-3-about-us-live-stats-content-image-${card.id}`
                  ] || ""
                }
                adminRole={adminRole}
                permissionsList={permissionsList}
                extraContainerClasses="mb-5"
              />

              {/* Status Number */}
              <NormalTextInputField
                isFetching={isFetching}
                fieldId={`home-section-3-about-us-live-stats-content-number-${card.id}`}
                fieldName={`home-section-3-about-us-live-stats-content-number-${card.id}`}
                placeholderText="Status Number"
                inputValue={
                  stateDetails?.[
                    `home-section-3-about-us-live-stats-content-number-${card.id}`
                  ] || ""
                }
                onChangeTextInputField={handleTextInputChange}
                extraContainerClasses="mb-5"
              />

              {/* Status Description */}
              <NormalTextInputField
                isFetching={isFetching}
                isTextArea={true}
                fieldId={`home-section-3-about-us-live-stats-content-description-${card.id}`}
                fieldName={`home-section-3-about-us-live-stats-content-description-${card.id}`}
                placeholderText="Status Description"
                inputValue={
                  stateDetails?.[
                    `home-section-3-about-us-live-stats-content-description-${card.id}`
                  ] || ""
                }
                onChangeTextInputField={handleTextInputChange}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LiveStatsContent;
