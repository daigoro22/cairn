import { itemSearchApiSchema } from '@/schemas/reviews';
import { createRouterClient } from '@/utils/supabase';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouterClient(cookieStore);

  const {
    error,
    data: { user },
  } = await supabase.auth.getUser();
  if (error || !user) {
    return NextResponse.json(
      { error: 'ログインしてください' },
      { status: 401 },
    );
  }

  const keyword = request.nextUrl.searchParams.get('keyword');
  if (!keyword) {
    return NextResponse.json(
      { error: 'リクエストパラメータを設定してください' },
      { status: 400 },
    );
  }

  const reqURL = new URL(
    'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601',
  );
  reqURL.searchParams.append(
    'applicationId',
    process.env.NEXT_PUBLIC_RAKUTEN_API_APPLICATION_ID!,
  );
  reqURL.searchParams.append(
    'affiliateId',
    process.env.NEXT_PUBLIC_RAKUTEN_API_AFFILIATE_ID!,
  );
  reqURL.searchParams.append(
    'elements',
    'itemName,itemCode,itemUrl,mediumImageUrls',
  );
  reqURL.searchParams.append('keyword', keyword);
  reqURL.searchParams.append('imageFlag', '1');

  const res = await fetch(reqURL.toString(), { method: 'GET' });
  if (!res.ok) {
    return NextResponse.json(
      { message: '商品検索に失敗しました' },
      { status: 500 },
    );
  }
  const parsed = itemSearchApiSchema.safeParse(await res.json());
  if (!parsed.success) {
    return NextResponse.json(
      { message: '商品が見つかりませんでした' },
      { status: 404 },
    );
  } else {
    return NextResponse.json(parsed.data, { status: 200 });
  }
}
