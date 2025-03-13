import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
});

export const ENV = envSchema.parse(process.env);
