"use client";

import { globalStyleObj } from "@/app/assets/styles";
import {
  LabelText,
  NormalBrowseFileInputFiled,
  NormalTextInputField,
} from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

const HomeBannerSectionFormFields = ({
  activeLang,
  isFetching,
  allFilesResponse,
  searchValue,
  selectedFileType,
  onChangeImage,
  handleTextInputChange,
  // handleTextEditorInputChange,
  addOnlyValueRepeaterChange,
  removeOnlyValueRepeaterChange,
  updateOnlyValueRepeaterChange,
  stateDetails,
  adminRole,
  permissionsList,
  colorGrade,
}) => {
  const isHideInOtherLanguages = useMemo(() => {
    return activeLang === "en" ? true : false;
  }, [activeLang]);

  // Update Multiple Image Entry
  const updateImageId = (id, index) => {
    if (id) {
      updateOnlyValueRepeaterChange("home_section_1_banner_images", index, id);
    } else {
      updateOnlyValueRepeaterChange("home_section_1_banner_images", index, "");
    }
  };

  // Remove Multiple Image Entry
  const removeImageId = (index) => {
    removeOnlyValueRepeaterChange("home_section_1_banner_images", index);
  };

  // Add Multiple Image Entry
  const addNewEntry = () => {
    addOnlyValueRepeaterChange("home_section_1_banner_images");
  };

  // -----------------------------------------

  // Update Multiple Heading Entry
  const updateHeadingId = (e, index) => {
    const value = e.target.value;

    updateOnlyValueRepeaterChange(
      "home_section_1_banner_headings",
      index,
      value
    );
  };

  // Remove Multiple Heading Entry
  const removeHeadingId = (index) => {
    removeOnlyValueRepeaterChange("home_section_1_banner_headings", index);
  };

  // Add Multiple Heading Entry
  const addNewHeadingEntry = () => {
    addOnlyValueRepeaterChange("home_section_1_banner_headings");
  };

  return (
    <>
      {/* Multiple Banner Image */}
      {isHideInOtherLanguages && (
        <div className="w-full mt-5 flex flex-col gap-2 xl:flex-row justify-between lg:gap-5">
          {isFetching ? (
            <Skeleton className="w-[150px] h-[30px] rounded-md" />
          ) : (
            <LabelText
              text="Banner Images"
              htmlForId="home-section-1-banner-images"
              star={false}
              translateField={false}
            />
          )}

          <div className="w-full lg:max-w-[500px]">
            {stateDetails?.["home_section_1_banner_images"] &&
              stateDetails?.["home_section_1_banner_images"].length > 0 && (
                <div className="w-full">
                  {stateDetails?.["home_section_1_banner_images"].map(
                    (item, index) => (
                      <div key={index} className="w-full flex gap-2 mb-5">
                        {isFetching ? (
                          <Skeleton className="w-full flex-1 h-[40px] rounded-md" />
                        ) : (
                          <NormalBrowseFileInputFiled
                            isFetching={isFetching}
                            fieldId={`home-section-1-banner-image-${activeLang}-${index}`}
                            allFilesResponse={allFilesResponse}
                            searchValue={searchValue}
                            selectedFileType={selectedFileType}
                            onChangeImageFunction={(id) =>
                              updateImageId(id, index)
                            }
                            selectedFileId={
                              stateDetails?.["home_section_1_banner_images"]?.[
                                index
                              ] || ""
                            }
                            adminRole={adminRole}
                            permissionsList={permissionsList}
                            extraContainerClasses="flex-1"
                          />
                        )}

                        {isFetching ? (
                          <Skeleton className="w-[30pxpx] h-[40px] rounded-md" />
                        ) : (
                          <button
                            type="button"
                            onClick={() => removeImageId(index)}
                            className="flex justify-center items-start"
                          >
                            <MdOutlineDeleteForever
                              size={25}
                              className="text-red-500 hover:scale-[1.2] transition-300"
                            />
                          </button>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}

            {isFetching ? (
              <Skeleton className="w-[120px] h-[40px] rounded-md" />
            ) : (
              <button
                type="button"
                onClick={() => addNewEntry()}
                className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white w-full sm:max-w-[120px] dark:text-light-weight-800`}
              >
                Add
              </button>
            )}
          </div>
        </div>
      )}

      {/* Multiple Banner Headings */}
      <div className="w-full mt-5 flex flex-col gap-2 xl:flex-row justify-between lg:gap-5">
        {isFetching ? (
          <Skeleton className="w-[150px] h-[30px] rounded-md" />
        ) : (
          <LabelText
            text="Banner Headings"
            htmlForId="home-section-1-banner-headings"
            star={false}
            translateField={true}
          />
        )}

        <div className="w-full lg:max-w-[500px]">
          {stateDetails?.["home_section_1_banner_headings"] &&
            stateDetails?.["home_section_1_banner_headings"].length > 0 && (
              <div className="w-full">
                {stateDetails?.["home_section_1_banner_headings"].map(
                  (item, index) => (
                    <div key={index} className="w-full flex gap-2 mb-5">
                      {isFetching ? (
                        <Skeleton className="w-full flex-1 h-[40px] rounded-md" />
                      ) : (
                        <NormalTextInputField
                          isFetching={isFetching}
                          fieldId={`home-section-1-banner-heading-${activeLang}-${index}`}
                          // fieldName="home-section-1-banner-heading"
                          placeholderText={`Heading ${index + 1}`}
                          inputValue={
                            stateDetails?.["home_section_1_banner_headings"]?.[
                              index
                            ] || ""
                          }
                          onChangeTextInputField={(e) =>
                            updateHeadingId(e, index)
                          }
                          extraContainerClasses="w-full"
                          // translateField={true}
                          // extraContainerClasses="mt-5"
                        />
                      )}

                      {isFetching ? (
                        <Skeleton className="w-[30pxpx] h-[40px] rounded-md" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeHeadingId(index)}
                          className="flex justify-center items-start"
                        >
                          <MdOutlineDeleteForever
                            size={25}
                            className="text-red-500 hover:scale-[1.2] transition-300"
                          />
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            )}

          {isFetching ? (
            <Skeleton className="w-[120px] h-[40px] rounded-md" />
          ) : (
            <button
              type="button"
              onClick={() => addNewHeadingEntry()}
              className={`${globalStyleObj.flexCenter} transition-300 gap-2 rounded-[4px] ${colorGrade.bgColor} ${colorGrade.hoverBgColor} ${colorGrade.textColor} px-5 py-2 font-poppins-rg text-[13px] tracking-wide hover:text-white w-full sm:max-w-[120px] dark:text-light-weight-800`}
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Button Label */}
      <NormalTextInputField
        isFetching={isFetching}
        labelText="Button Label"
        fieldId="home-section-1-banner-button-label"
        fieldName="home-section-1-banner-button-label"
        placeholderText="Label Name"
        inputValue={stateDetails?.["home-section-1-banner-button-label"] || ""}
        onChangeTextInputField={handleTextInputChange}
        extraContainerClasses="mt-5"
        translateField={true}
      />
    </>
  );
};

export default HomeBannerSectionFormFields;
