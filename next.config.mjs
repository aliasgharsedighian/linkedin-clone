/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "linkedinclone.blob.core.windows.net",
      },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
  env: {
    SERVER_ADDRESS: "http://localhost:4000",
  },
};

export default nextConfig;
