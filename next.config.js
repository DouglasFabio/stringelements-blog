/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:Development*',
        destination: 'http://localhost:5000/api/:Development*',
      },
    ]
  }
}

module.exports = nextConfig
