import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://www.google.com",
          },
        ],
      },
    ];
  },

  // Optional: disable telemetry for cleaner production logs
  telemetry: false,
};

export default nextConfig;
