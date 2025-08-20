// NOTE Get image full URL
export const getImageFullUrl = (url) => {
  if (!url) return null;

  return `${process.env.NEXT_PUBLIC_AWS_DEFAULT_PATH}${url}`;
};
