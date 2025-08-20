import Image from "next/image";

const StartupGridSection = () => {
  return (
    <section
      id="home-page-startup-section"
      className="w-full relative py-[100px]"
    >
      <span className="absolute inset-0 bg-overlay-dot-shape bg-cover opacity-80" />

      <div className="absolute top-0 w-full h-[250px] overflow-hidden opacity-80">
        <Image
          src="/fujairah-freezone/overlay/overlay-three-dots.svg"
          alt="overlay"
          fill
          priority={true}
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-contain object-right"
        />
      </div>

      <div className="container max-screen-width px-5 relative z-2">
        <div className="strtUpGridBlock grid gap-6 [grid-template-columns:repeat(15,minmax(0,1fr))] border border-green-500">
          {/* BOX 1 */}
          <div className="strtUpBox rounded-[20px] overflow-hidden [filter:drop-shadow(0px_0px_5px_rgba(0,0,0,0.5))] strtUpBoxOne relative z-[1] grid col-start-1 col-end-7 row-start-1 row-end-1 [background:linear-gradient(106deg,#2c3e50_0%,#2980b9_100%)] text-white">
            <div className="strtUpBoxIner flex items-center">
              <div className="strtUpContentBlock flex-1 basis-full p-6 border-r-2 border-dashed border-white">
                <h2 className="strtUpContentBlockTitle">Virtual Offices</h2>
                <p>infrastructure to accommodate investors</p>
              </div>
              <div className="strtUpContentBlock flex-1 basis-full p-6">
                <h2 className="strtUpContentBlockTitle">Trading Offices</h2>
                <p>furnished and unfurnished trading offices</p>
              </div>
            </div>
          </div>

          {/* BOX 2 */}
          <div className="strtUpBox rounded-[20px] overflow-hidden [filter:drop-shadow(0px_0px_5px_rgba(0,0,0,0.5))] strtUpBoxTwo grid col-start-1 col-end-9 row-start-1 row-end-4 border border-red-600">
            <div className="strtUpBoxIner flex items-center">
              <div className="strtUpBoxFigure relative size-full flex items-center justify-center">
                <Image
                  src="/fujairah-freezone/pages/home/startup-1-bg.png"
                  alt="office room"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* BOX 3 */}
          <div className="strtUpBox rounded-[20px] overflow-hidden [filter:drop-shadow(0px_0px_5px_rgba(0,0,0,0.5))] strtUpBoxThree relative grid col-start-9 col-end-13 row-start-1 row-end-1">
            <div className="strtUpBoxIner flex items-center">
              <div className="strtUpBoxFigure relative size-full flex items-center justify-center">
                <Image
                  src="/fujairah-freezone/pages/home/startup-2-bg.png"
                  alt="warehouse"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="strtUpContentBlock absolute inset-0 z-[9] flex items-center justify-center text-center">
                <h2 className="strtUpContentBlockTitle mb-0">Warehouse</h2>
              </div>
            </div>
          </div>

          {/* BOX 4 */}
          <div className="strtUpBox rounded-[20px] overflow-hidden [filter:drop-shadow(0px_0px_5px_rgba(0,0,0,0.5))] strtUpBoxFour grid col-start-7 col-end-13 row-start-2 row-end-4">
            <div className="strtUpBoxIner flex items-center">
              <div className="strtUpBoxFigure relative size-full flex items-center justify-center">
                <Image
                  src="/fujairah-freezone/pages/home/startup-3-bg.png"
                  alt="logo"
                  fill
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* BOX 5 */}
          <div className="strtUpBox rounded-[20px] overflow-hidden [filter:drop-shadow(0px_0px_5px_rgba(0,0,0,0.5))] strtUpBoxFive grid col-start-13 row-start-1 row-end-4 [background:linear-gradient(-45deg,rgba(83,105,118,1)_66%,rgba(41,46,73,1)_100%)] border border-pink-600">
            <div className="strtUpBoxIner flex flex-col justify-between p-6">
              <div className="strtUpContentBlock flex flex-col justify-center flex-1 p-0">
                <h2 className="strtUpContentBlockTitle">Open Land</h2>
                <p>open land for long term lease</p>
              </div>
              <div className="strtUpContentBlock flex flex-col justify-center flex-1 p-0">
                <h2 className="strtUpContentBlockTitle">Custom Built Units</h2>
                <p>
                  Warehouses equipped according to suit the investor's
                  requirements
                </p>
              </div>
              <div className="strtUpContentBlock flex flex-col justify-center flex-1 p-0">
                <h2 className="strtUpContentBlockTitle">
                  Offshore Registration
                </h2>
                <p>Overseas companies are registered by legal advisors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupGridSection;
