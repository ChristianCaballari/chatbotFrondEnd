/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "minimalapischris.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "penguinui.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
