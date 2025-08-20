"use server";

import { servicesDetailsData } from "@/app/assets/data/pagesData/service-details-page-data";

export const getServiceDetails = async (slug) => {
  // Optional delay to mimic API
  await new Promise((resolve) => setTimeout(resolve, 300));

  const service = servicesDetailsData.find((item) => item.serviceSlug === slug);
  return service || null;
};
