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
  async redirects() {
    return [
      {
        source: '/docs/components/:path*',
        destination: '/docs/components/animate/:path*',
        permanent: true,
      },
      {
        source: '/docs/radix/:path*',
        destination: '/docs/components/radix/:path*',
        permanent: true,
      },
      {
        source: '/docs/base/:path*',
        destination: '/docs/components/radix/:path*',
        permanent: true,
      },
      {
        source: '/docs/headless/:path*',
        destination: '/docs/components/radix/:path*',
        permanent: true,
      },
      {
        source: '/docs/buttons/:path*',
        destination: '/docs/primitives/buttons/:path*',
        permanent: true,
      },
      {
        source: '/docs/backgrounds/:path*',
        destination: '/docs/components/backgrounds/:path*',
        permanent: true,
      },
      {
        source: '/docs/effects/motion-effect',
        destination: '/docs/primitives/effects/effect',
        permanent: true,
      },
      {
        source: '/docs/effects/motion-highlight',
        destination: '/docs/primitives/effects/highlight',
        permanent: true,
      },
      {
        source: '/docs/effects/:path*',
        destination: '/docs/primitives/effects/:path*',
        permanent: true,
      },
      {
        source: '/docs/ui-elements/:path*',
        destination: '/docs/components/community/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
