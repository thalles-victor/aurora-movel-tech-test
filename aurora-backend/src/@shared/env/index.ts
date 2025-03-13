import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  // BACKEND
  BACKEND_PROTOCOL: z.string().nonempty(),
  BACKEND_DOMAIN: z.string().nonempty(),
  PORT: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: 'POSTGRES_PORT must be a valid number',
    })
    .transform((val) => parseInt(val, 10)),

  // POSTGRES
  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z
    .string()
    .refine((val) => !isNaN(parseInt(val, 10)), {
      message: 'POSTGRES_PORT must be a valid number',
    })
    .transform((val) => parseInt(val, 10)),
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),

  // ROOT
  ROOT_EMAIL: z.string().nonempty(),
  ROOT_PASSWORD: z.string().nonempty(),

  // JWT
  JWT_SECRET: z.string().nonempty(),
  JWT_EXPIRES_IN: z.string().optional().default('24h'),

  // STORAGE PROVIDER
  STORAGE_PROVIDER: z
    .string()
    .transform((val) => val.toUpperCase())
    .refine((val) => Object.values(['LOCAL', 'S3']).includes(val as any), {
      message: `O valor deve ser um dos seguintes: ${Object.values(['local', 's3']).join(', ')}`,
    }),
  PUBLIC_IMAGES_BUCKET_NAME: z.string(),

  // AWS
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
});

export const ENV = envSchema.parse(process.env);
