import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { signUpApiSchema } from '@/schemas/sign-up';
import { createRouterClient } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const parsedFormData = signUpApiSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsedFormData.success) {
    return NextResponse.json(
      { error: 'フォーム入力が不正です' },
      { status: 400 },
    );
  }

  const {
    email,
    password,
    name,
    dateOfBirth,
    gender,
    termsAgreed,
    profileIcon,
  } = parsedFormData.data;

  const cookieStore = cookies();
  const supabase = createRouterClient(cookieStore);

  if (!email || !password) {
    return NextResponse.json(
      { error: 'メールアドレスもしくはパスワードを入力してください' },
      { status: 400 },
    );
  }

  if (!termsAgreed) {
    return NextResponse.json(
      { error: '利用規約への同意を行ってください' },
      { status: 400 },
    );
  }

  const profileIconPath = createHash('sha256')
    .update(`${email}}/${profileIcon.name}`)
    .digest('hex');

  const { error: uploadError } = await supabase.storage
    .from('profile_icons')
    .upload(profileIconPath, profileIcon);

  if (uploadError) {
    return NextResponse.json(
      { error: 'プロフィールアイコンのアップロードに失敗しました' },
      { status: 500 },
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      data: {
        name,
        profileIconPath,
        dateOfBirth,
        gender,
        termsAgreed,
      },
    },
  });

  if (error) {
    return NextResponse.json(
      { error: 'サインアップ処理に失敗しました' },
      { status: error.status },
    );
  }
  return NextResponse.json(
    { message: 'サインアップに成功しました' },
    { status: 200 },
  );
}
