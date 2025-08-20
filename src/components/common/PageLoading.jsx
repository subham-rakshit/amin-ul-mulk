// import { HeroAnimatedLogo } from "../public-pages-component";
import { LoaderFive } from "../ui/loader";

const PageLoading = ({ containerSize = "size-[150px]" }) => {
  return (
    <>
      <div className={`${containerSize} relative overflow-hidden`}>
        <LoaderFive text="Fetching Data..." />
        {/* <HeroAnimatedLogo textColor="text-dark-color" isRotate={true} /> */}
      </div>
    </>
  );
};

export default PageLoading;
