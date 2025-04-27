import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',
  serverExternalPackages: ['@electric-sql/pglite'],
  eslint: {
    ignoreDuringBuilds: process.env.CI === 'true',
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.clerk.dev',
        port: '',
        pathname: '/**',
      },
    ],
  }, // Добавлено: для поддержки изображений Clerk
  transpilePackages: ['@clerk/nextjs'], // Добавлено: для совместимости с Clerk
};

const sentryOptions = {
  org: 'EFHC',
  project: 'EFHC',
  silent: process.env.CI !== 'true',
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  telemetry: false,
};

export default withSentryConfig(
  bundleAnalyzer(withNextIntl(nextConfig)),
  sentryOptions
);
