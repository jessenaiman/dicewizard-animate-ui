import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: 'ui.aceternity.com',
      },
      {
        hostname: 'ui.paceui.com',
      },
    ],
  },
  reactStrictMode: false,
};

export default withMDX(config);
