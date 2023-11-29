import type { CookieOptions } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();

  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

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
      { error: 'email or password is missing' },
      { status: 400 },
    );
  }

  const { data, error } = await supabase.rpc('hello_world');
  console.log(data);

  await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
