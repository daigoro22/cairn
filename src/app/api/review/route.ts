import { REVIEW_TIMELINE_DEFAULT_QUERY_LIMIT } from '@/constants/supabase';
import { createRouterClient } from '@/utils/supabase';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouterClient(cookieStore);

  const searchParams = request.nextUrl.searchParams;
  const limit =
    searchParams.get('limit') ?? REVIEW_TIMELINE_DEFAULT_QUERY_LIMIT;

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

  const { statusText, status, data } = await supabase
    .from('reviews')
    .select(
      'id, title, user_id, item_image_url, item_name, objective, rating, objective_completion_percent, purchase_date, user_details(name, profile_icon_path)',
    )
    .filter('status', 'eq', 2)
    .limit(Number(limit))
    .order('updated_at', { ascending: true });

  const urls = await supabase.storage.from('profile_icons').createSignedUrls(
    data?.reduce((p: string[], { user_details }) => {
      return user_details && user_details.profile_icon_path
        ? [...p, user_details.profile_icon_path]
        : p;
    }, []) ?? [],
    3600,
  );

  const urlDict =
    urls.data?.reduce(
      (p: { [key: string]: string }, { path, signedUrl }) =>
        path ? { ...p, [path]: signedUrl } : p,
      {},
    ) ?? {};

  const reviewData = data?.map(
    ({
      id,
      title,
      item_name,
      item_image_url,
      rating,
      objective,
      objective_completion_percent,
      user_details,
    }) => ({
      id,
      title,
      itemName: item_name,
      itemImageUrl: item_image_url,
      rating,
      objective,
      objectiveCompletionPercent: objective_completion_percent,
      userName: user_details?.name,
      userProfileIconUrl: urlDict[user_details?.profile_icon_path ?? ''],
    }),
  );

  return NextResponse.json(
    { error: statusText, data: reviewData },
    {
      status,
    },
  );
}
