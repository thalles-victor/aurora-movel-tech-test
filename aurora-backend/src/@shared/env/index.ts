import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
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
});

export const ENV = envSchema.parse(process.env);
