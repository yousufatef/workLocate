/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      // Add other image hostnames as needed
    ],
    // Optional: You can also add these configurations:
    // minimumCacheTTL: 60, // Cache images for 60 seconds
    // formats: ['image/webp'], // Force webp format
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Default device sizes
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Default image sizes
  },
  // other config options here
};

module.exports = nextConfig;