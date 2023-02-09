module.exports = {
  // images: {
  //   domains: ['fakestoreapi.com'],
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
