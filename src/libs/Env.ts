import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine((val) => val.startsWith('postgresql://'), {
        message: 'DATABASE_URL must be a valid PostgreSQL connection string',
      })
      .optional(), // Временно опционально
    ARCJET_KEY: z.string().min(1).optional(),
    BETTER_STACK_TOKEN: z.string().min(1).optional(),
    CHECKLY_API_KEY: z.string().min(1).optional(),
    CODECOV_TOKEN: z.string().min(1).optional(),
    POSTHOG_KEY: z.string().min(1).optional(),
    SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
    CLERK_SECRET_KEY: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1).optional(),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    ARCJET_KEY: process.env.ARCJET_KEY,
    BETTER_STACK_TOKEN: process.env.BETTER_STACK_TOKEN,
    CHECKLY_API_KEY: process.env.CHECKLY_API_KEY,
    CODECOV_TOKEN: process.env.CODECOV_TOKEN,
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
