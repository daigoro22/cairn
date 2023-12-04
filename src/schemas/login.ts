import { z } from 'zod';
import { emailZodObject, passwordZodObject } from './sign-up';

export const loginApiSchema = z.object({
  email: emailZodObject,
  password: passwordZodObject,
});

export type LoginApiSchema = z.infer<typeof loginApiSchema>;
