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
    rating: z.number().min(0).max(5).step(0.5),
    purchaseDate: dateZodObject,
    objective: z.string().min(1).max(100),
    daysForObjectiveAchievement: z.number().positive(),
    objectiveCompletionPercent: z.number().min(0).max(100),
    review: z.string().min(1),
    itemImageUrl: z.string().url().nullish(),
  })
  .merge(itemZodObject.omit({ mediumImageUrls: true }));

export type ReviewEditApiSchema = z.infer<typeof reviewEditApiSchema>;

export const newReviewApiResponseSchema = z.object({
  error: z.string(),
  data: z.object({ id: z.string().uuid() }),
});
export type NewReviewApiResponseSchema = z.infer<
  typeof newReviewApiResponseSchema
>;
