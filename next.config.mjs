/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async headers() {
    return [
      {
        source: "/(.*)", // applies to all routes
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            // allow only these origins
            value: "https://showmecustomheadwear.stackerhq.com",
          },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With, Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
