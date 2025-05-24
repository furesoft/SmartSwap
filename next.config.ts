import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ["static.usernames.app-backend.toolsforhumanity.com"],
  },
  allowedDevOrigins: [
    "https://7d83-2a02-3102-b930-1ea0-b88d-568c-4ff2-b855.ngrok-free.app/",
  ], // Add your dev origin here
  reactStrictMode: false,
};

export default nextConfig;
