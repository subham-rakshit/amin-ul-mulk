/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  // experimental: {
  //   staleTimes: {
  //     dynamic: 60,
  //     static: 60,
  //   },
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "project-images-development.s3.me-central-1.amazonaws.com",
        pathname: "/**", // Matches all paths
      },
    ],
  },
};

export default withNextIntl(nextConfig);
