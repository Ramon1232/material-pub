
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default {
  nextConfig,
  // Otras configuraciones de Next.js
  reactStrictMode: true,

  // Configuración para servir fuentes estáticas
  async headers() {
    return [
      {
        source : '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests",
          },
        ],
      },
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