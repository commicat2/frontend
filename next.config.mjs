/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'commicatstorage.s3.ap-northeast-2.amazonaws.com',
        protocol: 'https',
      },
    ],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (isServer) {
      config.ignoreWarnings = [
        { module: /opentelemetry/ },
        { module: /require-in-the-middle/ },
      ];
    }
    return config;
  },
}

export default nextConfig;
