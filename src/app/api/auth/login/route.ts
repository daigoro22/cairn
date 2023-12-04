import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { loginApiSchema } from '@/schemas/login';
import { cookies } from 'next/headers';
import { createRouterClient } from '@/utils/supabase';

export async function POST(request: NextRequest) {
  const parsedBody = loginApiSchema.safeParse(await request.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: 'フォーム入力が不正です' },
      { status: 400 },
    );
  }

  const { email, password } = parsedBody.data;

  if (!email || !password) {
    return NextResponse.json(
      { error: 'メールアドレスもしくはパスワードを入力してください' },
      { status: 400 },
    );
  }

  const cookieStore = cookies();
  const supabase = createRouterClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: 'ログインに失敗しました' },
      { status: error.status },
    );
  }
  return NextResponse.json(
    { message: 'ログインに成功しました' },
    { status: 200 },
  );
}
