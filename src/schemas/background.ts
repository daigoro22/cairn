import { z } from 'zod';
import { dateZodObject } from './common';

export const backgroundEditApiSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(100, '名前は100文字以下になるようにしてください'),
  schoolCode: z.string().nullish(),
  startDate: dateZodObject,
  endDate: dateZodObject.nullish(),
});

export type BackgroundEditApiSchema = z.infer<typeof backgroundEditApiSchema>;
