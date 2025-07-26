import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: 'ui.aceternity.com',
      },
    ],
  },
  reactStrictMode: false,
};

export default withMDX(config);
