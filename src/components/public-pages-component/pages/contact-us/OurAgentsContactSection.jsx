import { ourAgentInContactUs } from "@/app/assets/data/pagesData/contact-us-page-data";
import Image from "next/image";
import { FontResizerWrapper, RevealOnView } from "../..";

const OurAgentsContactSection = () => {
  return (
    <div className="relative z-[99] mb-[200px]">
      <div className="max-screen-width px-5">
        <FontResizerWrapper
          as="h1"
          fontClasses={{
            0: "heading-0-2",
            1: "heading-2",
            2: "heading-2-1",
          }}
          className="text-primary-400 dark:text-dark-white font-family-primary font-bold mb-5"
        >
          Our Agents Contact
          <br /> Information
        </FontResizerWrapper>

        <FontResizerWrapper
          as="h2"
          fontClasses={{
            0: "subtitle-0-2",
            1: "subtitle-2",
            2: "subtitle-2-1",
          }}
          className="text-gray-400 dark:text-dark-white font-family-secondary font-[500] mb-[30px]"
        >
          Contact our agents
        </FontResizerWrapper>

        <ul className="grid grid-cols-3 gap-5">
          {ourAgentInContactUs.map((agent) => {
            const delay = agent._id === 0 ? 0 : 0.1 + (agent._id - 1) * 0.1;
            return (
              <RevealOnView
                key={agent._id}
                as="div"
                yOffset={100}
                delay={delay}
                className="flex items-center justify-between gap-2 px-[20px] py-[40px] rounded-[24px] shadow-card-custom-small dark:bg-white border border-[#00587E10]"
              >
                <div className="relative size-[70px] overflow-hidden">
                  <Image
                    src="/fujairah-freezone/pages/contact-us/contact-agent.svg"
                    alt="Agent"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center gap-6">
                  <FontResizerWrapper
                    as="span"
                    fontClasses={{
                      0: "subtitle-0-2",
                      1: "subtitle-2",
                      2: "subtitle-2-1",
                    }}
                    className="text-primary-400 font-family-secondary font-[500] px-6 py-[8px] rounded-[24px] bg-[#00587E10]"
                  >
                    {agent.tag}
                  </FontResizerWrapper>

                  <div className="flex flex-col gap-[6px]">
                    <FontResizerWrapper
                      as="span"
                      fontClasses={{
                        0: "body-0-2",
                        1: "body2",
                        2: "body-2-1",
                      }}
                      className="text-gray-400 font-family-secondary font-bold"
                    >
                      {agent.name}
                    </FontResizerWrapper>

                    <FontResizerWrapper
                      as="span"
                      fontClasses={{
                        0: "body-0-3",
                        1: "body3",
                        2: "body-3-1",
                      }}
                      className="text-gray-400 font-family-secondary font-medium"
                    >
                      {agent.contact}
                    </FontResizerWrapper>

                    <FontResizerWrapper
                      as="span"
                      fontClasses={{
                        0: "body-0-3",
                        1: "body3",
                        2: "body-3-1",
                      }}
                      className="text-gray-400 font-family-secondary font-medium"
                    >
                      {`Ext : ${agent.extensionNumber}`}
                    </FontResizerWrapper>

                    <FontResizerWrapper
                      as="span"
                      fontClasses={{
                        0: "body-0-3",
                        1: "body3",
                        2: "body-3-1",
                      }}
                      className="text-gray-400 dark:text-dark-white font-family-secondary font-medium flex flex-wrap items-center"
                    >
                      <span>
                        Email :{" "}
                        <span className="text-primary-400">
                          {agent.emailAddress.split("<br />")[0]}
                          <br />
                          {agent.emailAddress.split("<br />")[1]}
                        </span>
                      </span>
                    </FontResizerWrapper>
                  </div>
                </div>
              </RevealOnView>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OurAgentsContactSection;
