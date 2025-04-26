// next.config.ts
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

// Плагин для мультиязычности
const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

// Анализ размера бандла (включается при ANALYZE=true)
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',
  serverExternalPackages: ['@electric-sql/pglite'],
  eslint: { ignoreDuringBuilds: true },
};

const sentryOptions = {
  org: 'EFHC',
  project: 'EFHC',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  telemetry: false,
};

// Собираем плагины: i18n → анализатор → Sentry
export default withSentryConfig(
  bundleAnalyzer(withNextIntl(nextConfig)),
  sentryOptions
);
