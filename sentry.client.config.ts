import * as Sentry from '@sentry/nextjs';
import env from './Env';

if (env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: env.NODE_ENV,
    enabled: env.NODE_ENV !== 'development',
  });
}
