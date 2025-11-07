/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow these external image sources
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  },

  // Set custom headers for all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://www.google.com"
          }
        ]
      }
    ];
  },

  // Optional: disable telemetry for cleaner logs
};

export default nextConfig;
