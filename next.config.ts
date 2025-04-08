import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  compiler: {
    styledComponents: true,
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "192.168.15.7"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: `${process.env.NEXT_PUBLIC_HOME_REDIRECT}`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
