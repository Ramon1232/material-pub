
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default {
  nextConfig,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/fonts/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};