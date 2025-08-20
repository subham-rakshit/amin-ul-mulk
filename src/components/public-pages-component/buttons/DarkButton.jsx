import Image from "next/image";
import Link from "next/link";

const DarkButton = ({
  btnText,
  targetLink = "#",
  containerClasses = "",
  extraClasses = "",
  icon = false,
}) => {
  return (
    <Link href={targetLink} className={containerClasses}>
      <div
        className={`w-full hover:bg-orange-500 rounded-[14px] group ${extraClasses}`}
      >
        <button
          type="button"
          className={`w-full rounded-[14px] bg-black-500 text-[16px] font-candara-rg text-[#fff] leading-[24px] px-[16px] py-[12px] text-center group-hover:translate-x-[5px] group-hover:translate-y-[-5px] transition-300 ${extraClasses}`}
        >
          {btnText}
          {icon && (
            <div className="relative size-[24px]">
              <Image
                src="/bin-yaber-assets/icons/arrows-right/arrow-right-light.png"
                alt="arrow right"
                fill
                sizes="(max-width: 768px) 24px, 24px"
              />
            </div>
          )}
        </button>
      </div>
    </Link>
  );
};

export default DarkButton;
