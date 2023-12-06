import type { Database } from '@/types/supabase';
import type { CookieOptions } from '@supabase/ssr';
import {
  createBrowserClient as _createBrowserClient,
  createServerClient,
} from '@supabase/ssr';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const createRouterClient = (cookieStore: ReadonlyRequestCookies) =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: routerCookie(cookieStore),
    },
  );

const routerCookie = (cookieStore: ReadonlyRequestCookies) => ({
  get(name: string) {
    return cookieStore.get(name)?.value;
  },
  set(name: string, value: string, options: CookieOptions) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    cookieStore.set(name, value, options);
  },
  remove(name: string, options: CookieOptions) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    cookieStore.set(name, '', options);
  },
});

export const createBrowserClient = () =>
  _createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
