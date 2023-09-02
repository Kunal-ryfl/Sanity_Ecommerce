/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// module.exports = nextConfig
module.exports = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
		domains: ['cdn.sanity.io']
	}
  
};