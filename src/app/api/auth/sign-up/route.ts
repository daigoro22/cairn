import type { CookieOptions } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const name = formData.get('name')?.toString();
  const dateOfBirth = formData.get('dateOfBirth')?.toString();
  const gender = formData.get('gender')?.toString();
  const termsAgreed = formData.get('termsAgreed')?.toString();
  const file = formData.get('profileIcon') as File;

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );

  if (!email || !password) {
    return NextResponse.json(
      { error: 'メールアドレスもしくはパスワードを入力してください' },
      { status: 400 },
    );
  }

  if (termsAgreed !== 'true') {
    return NextResponse.json(
      { error: '利用規約への同意を行ってください' },
      { status: 400 },
    );
  }

  const profileIconPath = createHash('sha256')
    .update(`${name}/${file.name}`)
    .digest('hex');

  const { error: uploadError, data } = await supabase.storage
    .from('profile_icons')
    .upload(profileIconPath, file);

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
      { error: 'internal error' },
      { status: error.status },
    );
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
