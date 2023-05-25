// next.config.js
const withImages = require("next-images");
module.exports = withImages();

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.sanity.io"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};
