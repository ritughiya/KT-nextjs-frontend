module.exports = {
  reactStrictMode: false,
}

// next.config.js
const withImages = require('next-images')
module.exports = withImages()

module.exports = {
	images: {
		domains: ['cdn.sanity.io']	}
};

