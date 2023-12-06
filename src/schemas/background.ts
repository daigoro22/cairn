import { z } from 'zod';
import { dateZodObject, allowEmptydateZodObject } from './common';

const backgroundNameZodObject = z
  .string()
  .min(1, '名前を入力してください')
  .max(100, '名前は100文字以下になるようにしてください');

const backgroundIdZodObject = z.string().uuid().nullish();

export const backgroundEditApiSchema = z.object({
  items: z.array(
    z.object({
      backgroundId: backgroundIdZodObject,
      organizationName: backgroundNameZodObject,
      // schoolCode: z.string().nullish(),
      startDate: dateZodObject,
      endDate: allowEmptydateZodObject,
    }),
  ),
});

export const backgroundGetApiSchema = z.object({
  error: z.string(),
  data: z.object({
    items: z.array(
      z.object({
        backgroundId: backgroundIdZodObject,
        organizationName: backgroundNameZodObject,
        schoolCode: z.string().nullish(),
        startDate: dateZodObject,
        endDate: dateZodObject.nullish(),
      }),
    ),
  }),
});

export type BackgroundEditApiSchema = z.infer<typeof backgroundEditApiSchema>;
export type BackgroundGetApiSchema = z.infer<typeof backgroundGetApiSchema>;
