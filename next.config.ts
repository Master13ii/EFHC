// next.config.ts
import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/libs/Env';

// Инициализация плагина next-intl
const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');

// Настройка bundle analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Убираем заголовок X-Powered-By
  poweredByHeader: false,

  // Включаем строгий режим React
  reactStrictMode: true,

  // Собираем standalone-вывод
  output: 'standalone',

  // Внешние серверные пакеты (не трогано)
  serverExternalPackages: ['@electric-sql/pglite'],

  // Отключаем ESLint-проверку во время сборки
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Убираем встроенную секцию i18n — она будет обрабатываться через next-intl
  // (если вы ранее прописывали здесь locales, удалите их)
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

// Сборка конфигурации плагинами в порядке: next-intl → bundle-analyzer → sentry
const config = withSentryConfig(
  bundleAnalyzer(
    withNextIntl(nextConfig)
  ),
  sentryOptions
);

export default config;
