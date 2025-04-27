import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export default withSentryConfig(
  bundleAnalyzer(
    withNextIntl({
      eslint: {
        dirs: ['.'],
      },
      poweredByHeader: false,
      reactStrictMode: true,
      serverExternalPackages: ['@electric-sql/pglite', 'pg'], // Добавлено для Neon
    }),
  ),
  {
    org: 'efhc', // Изменено для твоего проекта
    project: 'efhc',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: { enabled: true },
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
    telemetry: false,
  },
);
