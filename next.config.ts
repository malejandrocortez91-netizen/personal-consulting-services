import type {NextConfig} from 'next';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  /* config options here */
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
  ...(isDev
    ? {
        experimental: {
          allowedDevOrigins: [
            'https://6000-firebase-studio-1762221620439.cluster-lqzyk3r5hzdcaqv6zwm7wv6pwa.cloudworkstations.dev',
          ],
        },
      }
    : {}),
};

export default nextConfig;
