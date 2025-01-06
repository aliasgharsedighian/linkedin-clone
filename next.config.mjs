/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      { protocol: "http", hostname: "localhost", port: "4000" },
      { protocol: "http", hostname: "192.168.63.38", port: "4000" },
    ],
  },
};

export default nextConfig;
