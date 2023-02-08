/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/cms',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
