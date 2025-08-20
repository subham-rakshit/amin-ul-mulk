import { ScrollArea } from "@/components/ui/scroll-area";
import ROUTES from "@/constants/routes";
import { getImageFullUrl } from "@/utils/helper-functions";
import { formatISODateString } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

const NewsDetailsSection = ({
  sectionId = "",
  content = {},
  otherBlogs = [],
  slug = "",
  currentLanguage = "en",
}) => {
  const translate = useTranslations();

  return (
    <section id={sectionId} className="w-full py-[40px] md:py-[80px]">
      <div className="max-screen-width mx-auto w-full px-2 md:px-5">
        <div className="grid grid-cols-12 gap-5 lg:gap-8 relative">
          {/* Details Content */}
          <div className="col-span-12 lg:col-span-7 border rounded-[24px] p-5">
            {/* Top Section Image */}
            {content.featured_image?.fileUrl && (
              <div className="w-full h-[300px] md:h-[500px] relative rounded-[18px] overflow-hidden">
                <Image
                  src={getImageFullUrl(content.featured_image.fileUrl)}
                  alt={content?.title || "Default Image"}
                  fill
                  sizes="(max-width: 767px) 100vw, 500px"
                  className="object-cover hover:scale-[1.1] transition-all duration-500 ease-in-out"
                />
              </div>
            )}

            {/* Post publish date */}
            {content?.updatedAt && (
              <div className="flex items-center rtl:justify-end gap-2 mt-3 ml-3">
                <SlCalender size={15} className="text-secondary rtl:order-2" />
                <span
                  className={`text-dark-color body3 secondary-font-family font-light rtl:order-1`}
                >
                  {formatISODateString(content.updatedAt)}
                </span>
              </div>
            )}

            {content?.title && (
              <h2 className="heading-3 md:heading-2 text-dark-color primary-font-family font-bold mt-4 md:mt-6">
                {content.title}
              </h2>
            )}

            {content?.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: content.description,
                }}
                className="body2 md:body1 text-dark-color secondary-font-family font-normal mt-5 md:mt-8 whitespace-pre-line"
              />
            )}

            <div className="hidden md:grid grid-cols-2 gap-5 mt-5">
              {content?.small_image_option_1?.fileUrl && (
                <div className="w-full h-[250px] rounded-[12px] overflow-hidden relative">
                  <Image
                    src={getImageFullUrl(content.small_image_option_1.fileUrl)}
                    alt={content?.title || "Default Image 1"}
                    fill
                    sizes="(max-width: 767px) 100vw, 300px"
                    className="object-cover hover:scale-[1.1] transition-all duration-500 ease-in-out"
                  />
                </div>
              )}

              {content?.small_image_option_2?.fileUrl && (
                <div className="w-full h-[250px] rounded-[12px] overflow-hidden relative">
                  <Image
                    src={getImageFullUrl(content.small_image_option_2.fileUrl)}
                    alt={content?.title || "Default Image 1"}
                    fill
                    sizes="(max-width: 767px) 100vw, 300px"
                    className="object-cover hover:scale-[1.1] transition-all duration-500 ease-in-out"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Other Posts Container */}
          {otherBlogs && otherBlogs.length > 0 && (
            <div className="col-span-12 lg:col-span-5">
              <div className="sticky top-[100px]">
                {/* Other Posts */}
                <div className="w-full rounded-[24px] bg-[#f5f5f5] p-5 md:p-8">
                  <h3 className="subtitle-2 md:subtitle-1 text-dark-color primary-font-family font-bold tracking-wide">
                    {translate("Other Posts")}
                  </h3>

                  <ScrollArea className="w-full h-[500px] flex flex-col gap-7 mt-5">
                    {otherBlogs.map((post, index) => (
                      <div
                        key={post?._id || index}
                        className={`w-full rounded-full flex gap-3 ${
                          index === otherBlogs.length - 1 ? "mb-0" : "mb-4"
                        }`}
                      >
                        {/* Image */}
                        {post?.featured_image?.fileUrl && (
                          <div className="w-[80px] h-[80px] rounded-[8px] relative overflow-hidden group flex-shrink-0">
                            <Image
                              src={getImageFullUrl(post.featured_image.fileUrl)}
                              alt={`other-post-${index}`}
                              fill
                              sizes="(max-width: 767px) 100vw, 100vw"
                              className="object-cover"
                            />

                            <Link
                              href={
                                post?.slug
                                  ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.NEWS}/${post.slug}`
                                  : "#"
                              }
                              className="absolute z-[9] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-0 group-hover:size-full bg-[#00000070] transition-all duration-500 ease-in-out flex items-center justify-center overflow-hidden"
                            >
                              <FaLink size={25} className="text-light-color" />
                            </Link>
                          </div>
                        )}

                        {/* Details */}
                        <div className="flex flex-col">
                          {post?.title?.[currentLanguage] && (
                            <Link
                              href={
                                post?.slug
                                  ? `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${currentLanguage}${ROUTES.NEWS}/${post.slug}`
                                  : "#"
                              }
                              className="subtitle-2 text-dark-color primary-font-family font-medium tracking-tight leading-[24px] hover:text-secondary hover:underline transition-all duration-500 ease-in-out"
                            >
                              {post.title[currentLanguage]}
                            </Link>
                          )}
                          {post?.updatedAt && (
                            <span className="body2 text-dark-color secondary-font-family font-normal tracking-tight">
                              {formatISODateString(post.updatedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsDetailsSection;
