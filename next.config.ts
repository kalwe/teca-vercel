/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // Ignora erros do ESLint na build
  },
}

module.exports = nextConfig
