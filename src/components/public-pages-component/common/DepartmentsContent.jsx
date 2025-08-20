"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getImageFullUrl } from "@/utils/helper-functions";
import { sanitizeHTMLServer } from "@/utils/sanitizeHtmlString";
import { getFileSettingsValue } from "@/utils/website-settings-helper";
import { useState } from "react";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const DepartmentsContent = ({ departments = [], filesList = [] }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Get Iamge Full URL
  const getImageURL = (id) => {
    return getImageFullUrl(
      getFileSettingsValue(filesList, id)?.fileUrl ?? null
    );
  };

  return (
    <>
      {/* Department Details */}
      {departments?.[activeTab]?.name ||
      departments?.[activeTab]?.description ||
      departments?.[activeTab]?.image ? (
        <div className="w-full mt-5 md:mt-10 grid grid-cols-12 gap-5 md:gap-10">
          {/* Text Content */}
          <div className="col-span-12 lg:col-span-7">
            {departments?.[activeTab]?.name ? (
              <h2 className="heading-3 md:heading-2 primary-font-family text-light-color font-bold tracking-wide">
                {departments[activeTab].name}
              </h2>
            ) : null}

            {departments?.[activeTab]?.designation ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTMLServer(
                    departments[activeTab].designation
                  ),
                }}
                className="body2 md:body1 text-light-color secondary-font-family font-normal mt-5 md:mt-8"
              />
            ) : null}
          </div>

          {/* Tabs */}
          {departments && departments.length > 0 && (
            <div className="h-fit col-span-12 lg:col-span-5 glass-effect rounded-[12px] overflow-hidden my-auto">
              {/* <ScrollArea className="w-full h-[425px] p-4">
                {departments.map((item, index) => (
                  <button
                    key={`department-${index + 1}`}
                    onClick={() => setActiveTab(index)}
                    className={`w-full py-3 rounded-[8px] ${index !== departments.length - 1 ? "mb-4" : "mb-0"} ${
                      activeTab === index
                        ? "bg-secondary"
                        : "shadow-[inset_-2px_-2px_5px_#ffffff40,inset_2px_2px_8px_#00000040] hover:shadow-[inset_-3px_-3px_5px_#ffffff40,inset_3px_3px_12px_#00000040] transition-all duration-300 ease-in-out"
                    }`}
                  >
                    <span
                      className={`body-0-1 secondary-font-family font-normal tracking-wider text-light-color`}
                    >
                      {item.name}
                    </span>
                  </button>
                ))}
              </ScrollArea> */}

              <ScrollArea className="w-full h-[425px] p-4">
                {departments.map((item, index) => (
                  <button
                    key={`department-${index + 1}`}
                    onClick={() => setActiveTab(index)}
                    className={`w-full py-3 rounded-[8px] ${index !== departments.length - 1 ? "mb-4" : "mb-0"} ${
                      activeTab === index ? "bg-secondary" : "bg-light-color"
                    }`}
                  >
                    <span
                      className={`body-0-1 secondary-font-family font-normal tracking-wider ${
                        activeTab === index
                          ? "text-light-color"
                          : "text-dark-color"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default DepartmentsContent;
