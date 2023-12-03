import {
  ACCEPT_IMAGE_TYPES,
  PROFILE_ICON_MAX_FILE_SIZE,
  PROFILE_ICON_MAX_FILE_SIZE_MB,
} from '@/constants/profileIcon';
import { z } from 'zod';

export const signUpApiSchema = z.object({
  name: z.string().min(1).max(100),
  profileIcon: z
    .custom<File>()
    .refine(
      (file) => file && file.size <= PROFILE_ICON_MAX_FILE_SIZE,
      `ファイルサイズが大きすぎます。${PROFILE_ICON_MAX_FILE_SIZE_MB}MB以下のファイルを選択してください`,
    )
    .refine(
      (file) => file && ACCEPT_IMAGE_TYPES.includes(file.type),
      'jepg, jpg, png のいずれかの画像を選択してください',
    ),
  email: z.string().email(),
  password: z.string().min(12).max(100),
  dateOfBirth: z.coerce.date(),
  gender: z.string().min(1).max(10),
  termsAgreed: z.literal(true),
});

export type SignUpApiSchema = z.infer<typeof signUpApiSchema>;
