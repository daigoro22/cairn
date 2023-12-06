import { isValid } from 'date-fns';
import { z } from 'zod';

export const dateZodObject = z
  .string({
    required_error: '日付を入力してください',
    invalid_type_error: '日付を入力してください',
  })
  .refine((date) => isValid(new Date(date)), '日付の形式が間違っています');

export const allowEmptydateZodObject = z
  .string({
    required_error: '日付を入力してください',
    invalid_type_error: '日付を入力してください',
  })
  .refine(
    (date) => date === '' || isValid(new Date(date)),
    '日付の形式が間違っています',
  );

export const emailZodObject = z
  .string()
  .email('メールアドレスの形式で入力を行ってください');

export const passwordZodObject = z
  .string()
  .min(12, 'パスワードは12文字以上にしてください')
  .max(100, 'パスワードは100文字以下にしてください');
