
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // config options here
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // If you are deploying to a custom domain on a different host, you may need to uncomment
  // and configure the following lines for Server Actions to work correctly.
  // Replace 'your-domain.com' with your actual domain name.
  experimental: {
    serverActions: {
      allowedOrigins: ['studio--studio-847528267-75732.us-central1.hosted.app'],
    },
  },
};

export default nextConfig;
