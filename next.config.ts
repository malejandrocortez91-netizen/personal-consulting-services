import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
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
  output: 'standalone',
  // Note for Publishing: To ensure your contact form works when deployed,
  // you MUST uncomment the experimental block below and replace the
  // placeholder URL with your actual production app URL.
  /*
  experimental: {
    serverActions: {
      allowedOrigins: ['studio--studio-847528267-75732.us-central1.hosted.app'],
    },
  },
  */
};

export default nextConfig;
