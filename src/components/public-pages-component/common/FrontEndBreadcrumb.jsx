"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const FrontEndBreadcrumb = ({
  fields,
  currentTabName = "",
  isCurrentTabTranslated = false,
  navContainerClass = "",
}) => {
  const translate = useTranslations();

  return (
    <div className="flex justify-center items-center">
      <nav aria-label="Breadcrumb" className={navContainerClass}>
        {fields.map((field, index) => (
          <div
            key={`${field.label}-${index + 1}`}
            className="flex items-center gap-1"
          >
            {/* Separator */}
            {index > 0 && (
              <ChevronRight size={20} className="text-light-color" />
            )}

            {/* Render the breadcrumb item */}
            <Link
              href={field.link}
              className={`text-light-color secondary-font-family leading-[100%]`}
            >
              <span
                className={`body-0-2 md:body1 secondary-font-family font-[400]`}
              >
                {translate(field.label)}
              </span>
            </Link>
          </div>
        ))}

        {/* Current Tab */}
        {currentTabName && (
          <div className="flex items-center gap-1">
            {/* Separator */}
            <ChevronRight size={20} className="text-light-color" />

            {/* Render the breadcrumb item */}
            <span
              className={`body-0-2 md:body1 text-light-color secondary-font-family font-[400]`}
            >
              {currentTabName}
            </span>
          </div>
        )}
      </nav>
    </div>
  );
};

export default FrontEndBreadcrumb;
