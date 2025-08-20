import { FlipCard, SectionInfo } from "../..";

const WhySetupSection = () => {
  return (
    <section
      id="home-page-why-setup-section"
      className="w-full py-[80px] relative"
    >
      <div className="absolute inset-0 bg-home-overlay-3 bg-cover opacity-80" />

      <div className="relative z-[99] max-screen-width px-5">
        <SectionInfo
          heading="Why set up a business with Fujairah Free Zone"
          subHeading="Lorem ipsum dolor sit amet. Ad rerum galisum aut nobis voluptatem
            eum fugit vero aut dicta earum vel commodi perferendis."
          className="mb-[33px]"
        />

        <div className="h-[600px] grid gap-10">
          <FlipCard
            imgSrc="/fujairah-freezone/pages/home/why-setup-img-1.png"
            altText="Image 1"
            title="Multi-access to neighboring and global markets by land, sea and air"
            className="col-start-1 col-end-4 row-start-1 row-end-12"
            priority={true}
          />

          <FlipCard
            imgSrc="/fujairah-freezone/pages/home/why-setup-img-2.png"
            altText="Image 2"
            title="Variety of investment fields"
            className="col-start-4 col-end-7 row-start-1 row-end-6"
            priority={true}
          />

          <FlipCard
            imgSrc="/fujairah-freezone/pages/home/why-setup-img-3.png"
            altText="Image 3"
            title="Investor-oriented policies"
            className="col-start-7 col-end-12 row-start-1 row-end-6"
            priority={true}
          />

          <FlipCard
            imgSrc="/fujairah-freezone/pages/home/why-setup-img-4.png"
            altText="Image 4"
            title="Efficient and cost-effective investment facilitation"
            className="col-start-4 col-end-9 row-start-6 row-end-12"
            priority={true}
          />

          <FlipCard
            imgSrc="/fujairah-freezone/pages/home/why-setup-img-5.png"
            altText="Image 5"
            title="Full investment security"
            className="col-start-9 col-end-12 row-start-6 row-end-12"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default WhySetupSection;
