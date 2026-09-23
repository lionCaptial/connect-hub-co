import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import path from 'node:path';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Parent folders contain other lockfiles; pin Turbopack to this monorepo.
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
  // Allow LAN access to HMR when opening the site via machine IP.
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.1.10'],
  async redirects() {
    return [
      { source: '/refund-policy', destination: '/cancellation-policy', permanent: true },
      { source: '/policies-and-legal-terms', destination: '/privacy-policy', permanent: true },
      { source: '/policies-legal-terms', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/booking-terms', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
