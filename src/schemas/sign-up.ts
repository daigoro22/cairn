import {
  ACCEPT_IMAGE_TYPES,
  PROFILE_ICON_MAX_FILE_SIZE,
  PROFILE_ICON_MAX_FILE_SIZE_MB,
} from '@/constants/profileIcon';
import { z } from 'zod';
import { dateZodObject, emailZodObject, passwordZodObject } from './common';

export const signUpApiSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(100, '名前は100文字以下になるようにしてください'),
  profileIcon: z
    .custom<File>()
    .refine((file) => file, 'ファイルを選択してください')
    .refine(
      (file) => !file || file.size <= PROFILE_ICON_MAX_FILE_SIZE,
      `ファイルサイズが大きすぎます。${PROFILE_ICON_MAX_FILE_SIZE_MB}MB以下のファイルを選択してください`,
    )
    .refine(
      (file) => !file || ACCEPT_IMAGE_TYPES.includes(file.type),
      'jepg, jpg, png のいずれかの画像を選択してください',
    ),
  email: emailZodObject,
  password: passwordZodObject,
  dateOfBirth: dateZodObject,
  gender: z
    .string({ invalid_type_error: '性別を入力してください' })
    .min(1)
    .max(10),
  termsAgreed: z.coerce
    .boolean()
    .refine((bool) => bool, '利用規約に同意してください'),
});

export type SignUpApiSchema = z.infer<typeof signUpApiSchema>;
