import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ["static.usernames.app-backend.toolsforhumanity.com"],
  },
  allowedDevOrigins: ["https://smart-swap-nine.vercel.app/", "http://localhost:3000", "https://055c-2a02-3102-b930-1ea0-84d2-513-e447-b57c.ngrok-free.app/"], // Add your dev origin here
  reactStrictMode: false,
};

export default nextConfig;
