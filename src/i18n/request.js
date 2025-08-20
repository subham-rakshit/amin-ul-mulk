import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const resolvedLocale = typeof requestLocale === 'string'
  ? requestLocale
  : await requestLocale;

  const locale = routing.locales.includes(resolvedLocale)
    ? resolvedLocale
    : routing.defaultLocale;

  // Import locale messages
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
