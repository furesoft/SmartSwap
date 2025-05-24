import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ["static.usernames.app-backend.toolsforhumanity.com"],
  },
  allowedDevOrigins: ["https://smart-swap-nine.vercel.app/", "http://localhost:3000", "https://jaybird-crisp-clam.ngrok-free.app/"], // Add your dev origin here
  reactStrictMode: false,
};

export default nextConfig;
