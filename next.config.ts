import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "i.pravatar.cc",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "cdn.shadcnstudio.com",
      },
      {
        hostname: "www.gravatar.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
