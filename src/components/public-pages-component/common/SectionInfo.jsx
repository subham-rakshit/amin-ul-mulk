import { FontResizerWrapper } from "..";

const SectionInfo = ({
  heading = "",
  headingColor = "text-gray-400",
  subHeading = "",
  className = "",
}) => {
  if (!heading && !subHeading) return null;

  return (
    <div className={className}>
      {heading && (
        <FontResizerWrapper
          as="h1"
          fontClasses={{
            0: "heading-0-2",
            1: "heading-2",
            2: "heading-2-1",
          }}
          className={`${headingColor} dark:text-dark-white font-family-primary font-[600] text-center mb-[6px]`}
        >
          {heading}
        </FontResizerWrapper>
      )}

      {subHeading && (
        <FontResizerWrapper
          as="p"
          fontClasses={{
            0: "subtitle-0-2",
            1: "subtitle-2",
            2: "subtitle-2-1",
          }}
          className="w-full max-w-[900px] mx-auto text-gray-400 dark:text-dark-white font-family-secondary font-[500] text-center"
        >
          {subHeading}
        </FontResizerWrapper>
      )}
    </div>
  );
};

export default SectionInfo;
