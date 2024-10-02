/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/studio',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
