import { faqs } from "@/app/assets/data/pagesData/home-page-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { FontResizerWrapper, RevealOnView, SectionInfo } from "../..";

const FaqSection = () => {
  return (
    <section id="home-page-faqs-section" className="w-full py-[80px] relative">
      <div className="absolute inset-0 bg-home-overlay-5 bg-contain opacity-80" />

      <div className="relative z-[99] max-screen-width px-5">
        <SectionInfo
          heading="Fequently asked questions"
          className="mb-[28px]"
        />

        <Accordion
          type="single"
          collapsible
          className="w-full max-w-[900px] mx-auto flex flex-col gap-[16px] md:gap-[14px]"
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
    </section>
  );
};

export default FaqSection;
