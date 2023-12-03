import {
  ACCEPT_IMAGE_TYPES,
  PROFILE_ICON_MAX_FILE_SIZE,
  PROFILE_ICON_MAX_FILE_SIZE_MB,
} from '@/constants/profileIcon';
import { isValid } from 'date-fns';
import { z } from 'zod';

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
  email: z.string().email('メールアドレスの形式で入力を行ってください'),
  password: z
    .string()
    .min(12, 'パスワードは12文字以上に設定してください')
    .max(100, 'パスワードは100文字以下になるように設定してください'),
  dateOfBirth: z
    .string({
      required_error: '日付を入力してください',
      invalid_type_error: '日付を入力してください',
    })
    .refine((date) => isValid(new Date(date)), '日付の形式が間違っています')
    .transform((date) => new Date(date)),
  gender: z
    .string({ invalid_type_error: '性別を入力してください' })
    .min(1)
    .max(10),
  termsAgreed: z.coerce
    .boolean()
    .refine((bool) => bool, '利用規約に同意してください'),
});

export type SignUpApiSchema = z.infer<typeof signUpApiSchema>;
