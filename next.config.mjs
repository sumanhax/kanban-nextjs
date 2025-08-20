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
        source: "/(.*)",
        headers: [
          // Remove frame restrictions
          { key: "X-Frame-Options", value: "ALLOWALL" }, 
          // Or use CSP instead of ALLOWALL (more modern)
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
        ],
      },
    ];
  },
};

export default nextConfig;
