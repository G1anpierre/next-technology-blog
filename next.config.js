/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['picsum.photos', 'res.cloudinary.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
