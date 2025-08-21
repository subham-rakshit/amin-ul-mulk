import { useTranslations } from "next-intl";
import Image from "next/image";

const AboutCEOMessageSection = () => {
  const translate = useTranslations();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 py-[50px]">
      {/* Message */}
      <div>
        <h2 className="heading-3 md:heading-2-1 text-dark-color primary-font-family font-bold">
          CEO's Message
        </h2>

        <p className="w-full body2 md:subtitle-2 text-dark-color secondary-font-family font-medium mt-5 md:mt-8">
          ''As an Afghan and the CEO of Amin-ul-Mulk Law Firm Organization, I am
          deeply committed to serving our people and homeland. Having witnessed
          the challenges faced by Afghans, especially returnees, I founded this
          firm to provide trusted, ethical, and compassionate legal guidance.
          Our team works tirelessly to protect rights, resolve disputes, and
          restore confidence in Afghanistan’s legal system. Every case we handle
          is a pledge to empower our clients, support our communities, and
          contribute to a stronger, fairer future for our beloved country''.
        </p>
        <p className="w-full body2 md:subtitle-2 text-dark-color secondary-font-family font-medium mt-3">
          - CEO Name
        </p>
      </div>

      {/* CEO Image */}
      <div className="w-full max-w-[400px] h-[500px] relative overflow-hidden rounded-[12px] shadow-card-custom ltr:ml-auto rtl:mr-auto">
        <Image
          src="/amin-ul-miulk-law-firm/bg/about-us-ceo.png"
          alt="CEO"
          fill
          sizes="(max-width: 767px) 100vw, 100vw"
          className="object-cover ltr:scale-x-[-1] bg-center"
        />
      </div>
    </div>
  );
};

export default AboutCEOMessageSection;
