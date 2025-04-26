import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';

// Плагин мультиязычности
const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

// Анализ бандла (включается при ANALYZE=true)
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',
  serverExternalPackages: ['@electric-sql/pglite'],
  eslint: {
    ignoreDuringBuilds: process.env.CI === 'true', // Игнорировать ESLint только в CI
  },
  // Настройки i18n (для next-intl)
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
};

// Настройки Sentry
const sentryOptions = {
  org: 'EFHC',
  project: 'EFHC',
  silent: process.env.CI !== 'true', // Логировать только вне CI
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  telemetry: false,
};

// Оборачивание: i18n → bundle-analyzer → Sentry
export default withSentryConfig(
  bundleAnalyzer(withNextIntl(nextConfig)),
  sentryOptions
);
