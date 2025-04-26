// next.config.ts
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

// Ваш плагин для i18n (не тронуто)
const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

// Ваш bundle analyzer (не тронуто)
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const baseConfig: NextConfig = {
  // Отключаем линтинг во время сборки
  eslint: {
    ignoreDuringBuilds: true,
  },

  poweredByHeader: false,
  reactStrictMode: true,
  output: 'standalone',

  // Ваши три языка, как и было
  i18n: {
    locales: ['ru', 'uk', 'en'],
    defaultLocale: 'ru',
    localeDetection: true,
  },

  // Ваши serverExternalPackages, как и было
  serverExternalPackages: ['@electric-sql/pglite'],
};

// Ваши опции Sentry (не тронуто)
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

// Собираем плагинами в том же порядке, что и было
const config = withSentryConfig(
  bundleAnalyzer(
    withNextIntl(baseConfig)
  ),
  sentryOptions
);

export default config;
