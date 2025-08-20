import { faqs } from "@/app/assets/data/pagesData/home-page-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { MdAdd, MdSearch } from "react-icons/md";
import { FontResizerWrapper, RevealOnView, SectionInfo } from "../..";

const tabs = [
  {
    name: "Category",
  },
  {
    name: "Qorem ipsum",
  },
  {
    name: "Qorem ipsum",
  },
  {
    name: "Qorem ipsum",
  },
  {
    name: "Qorem ipsum",
  },
  {
    name: "Qorem ipsum",
  },
];

const FAQsContentSection = ({ activeTab = "" }) => {
  return (
    <div className="w-full max-w-[1300px] mx-auto mt-[32px] mb-[120px]">
      <div className="w-full max-w-[1200px] mx-auto h-[60px] rounded-[60px] border border-[#00587E50] flex items-center gap-5 overflow-hidden px-[20px]">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent text-gray-400 font-family-secondary font-[500] border-none outline-none focus:border-none focus:outline-none focus:ring-0"
        />

        <span>
          <MdSearch size={24} />
        </span>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-5 mt-[80px] mb-[45px]">
        {tabs.map((tab, index) => {
          const delay = index === 0 ? 0 : 0.1 + (index - 1) * 0.1;
          return (
            <RevealOnView
              key={`tab-${index + 1}`}
              as="li"
              yOffset={100}
              delay={delay}
              className={`px-5 py-2 rounded-[24px] ${
                activeTab === tab.name.toLowerCase().split(" ").join("-")
                  ? "bg-primary-400"
                  : "bg-transparent border border-[#36393B]"
              }`}
            >
              <FontResizerWrapper
                as="span"
                fontClasses={{
                  0: "body-0-2",
                  1: "body2",
                  2: "body-2-1",
                }}
                className={`dark:text-dark-white font-family-secondary font-medium ${
                  activeTab === tab.name.toLowerCase().split(" ").join("-")
                    ? "text-dark-white"
                    : "text-gray-400"
                }`}
              >
                {tab.name}
              </FontResizerWrapper>
            </RevealOnView>
          );
        })}
      </ul>

      <SectionInfo heading="Frequently Asked Questions" className="mb-[40px]" />

      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-[16px] md:gap-[14px] mb-[80px]"
      >
        {faqs.map((item, index) => {
          return (
            <RevealOnView key={index} as="div" yOffset={100}>
              <AccordionItem
                key={item._id}
                value={item._id}
                className="rounded-[14px] px-[30px] py-[10px] bg-[#9AD3F9]"
              >
                <AccordionTrigger className="flex items-center justify-between gap-5 hover:no-underline">
                  <MdAdd className="size-[24px] text-gray-400 order-2 transition-transform duration-500 flex-shrink-0" />

                  <FontResizerWrapper
                    as="h3"
                    fontClasses={{
                      0: "heading-0-4",
                      1: "heading-4",
                      2: "heading-4-1",
                    }}
                    className="text-gray-400 font-family-secondary font-[600]"
                  >
                    {item.question}
                  </FontResizerWrapper>
                </AccordionTrigger>

                <AccordionContent className="overflow-hidden">
                  <FontResizerWrapper
                    as="p"
                    fontClasses={{
                      0: "subtitile-0-1",
                      1: "subtitile-1",
                      2: "subtitile-1-1",
                    }}
                    className="text-gray-400 font-family-secondary font-[400]"
                  >
                    {item.ans}
                  </FontResizerWrapper>
                </AccordionContent>
              </AccordionItem>
            </RevealOnView>
          );
        })}

        <RevealOnView as="div" yOffset={100}>
          <AccordionItem
            value="view-more"
            className="rounded-[14px] px-[30px] py-[20px] bg-[#9AD3F9]"
          >
            <Link
              href="#"
              className="flex items-center justify-between gap-5 hover:no-underline"
            >
              <IoIosArrowForward className="size-[22px] text-gray-400 order-2 transition-transform duration-500 flex-shrink-0" />

              <FontResizerWrapper
                as="h3"
                fontClasses={{
                  0: "body-0-3",
                  1: "body3",
                  2: "body-3-1",
                }}
                className="text-gray-400 font-family-secondary font-[600]"
              >
                View All
              </FontResizerWrapper>
            </Link>
          </AccordionItem>
        </RevealOnView>
      </Accordion>
    </div>
  );
};

export default FAQsContentSection;
