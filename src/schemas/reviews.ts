import { z } from 'zod';
import { dateZodObject } from './common';

const itemZodObject = z.object({
  itemCode: z.string(),
  itemName: z.string(),
  itemUrl: z.string().url(),
  mediumImageUrls: z.array(z.object({ imageUrl: z.string().url() })),
});

export const itemSearchApiSchema = z.object({
  Items: z.array(
    z.object({
      Item: itemZodObject,
    }),
  ),
});

export type ItemSearchApiSchema = z.infer<typeof itemSearchApiSchema>;

export const reviewEditApiSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string().min(1, '入力してください').max(100, '文字数が多すぎます'),
    rating: z.coerce.number().min(0).max(5).step(0.5),
    purchaseDate: dateZodObject,
    objective: z
      .string()
      .min(1, '入力してください')
      .max(100, '文字数が多すぎます'),
    daysForObjectiveAchievement: z.coerce
      .number()
      .positive('1以上を入力してください'),
    objectiveCompletionPercent: z.coerce
      .number()
      .min(0, '0以上を入力してください')
      .max(100, '100以上は入力できません'),
    review: z.string().min(1, '入力してください'),
    itemImageUrl: z.string().url().nullish(),
    itemUrl: z.string().url({ message: 'URLの形式で入力してください' }),
  })
  .merge(itemZodObject.omit({ mediumImageUrls: true, itemUrl: true }));

export type ReviewEditApiSchema = z.infer<typeof reviewEditApiSchema>;

export const reviewGetApiSchema = z.object({
  data: reviewEditApiSchema,
  error: z.string(),
});
export type ReviewGetApiSchema = z.infer<typeof reviewGetApiSchema>;

export const reviewTimelineApiSchema = z.object({
  data: z.array(
    reviewEditApiSchema
      .omit({
        itemUrl: true,
        itemCode: true,
        review: true,
        daysForObjectiveAchievement: true,
        purchaseDate: true,
      })
      .merge(
        z.object({
          userName: z.string(),
          userProfileIconUrl: z.string().url(),
        }),
      ),
  ),
  error: z.string(),
});

export type ReviewTimelineApiSchema = z.infer<typeof reviewTimelineApiSchema>;

export const newReviewApiResponseSchema = z.object({
  error: z.string(),
  data: z.object({ id: z.string().uuid() }),
});
export type NewReviewApiResponseSchema = z.infer<
  typeof newReviewApiResponseSchema
>;
