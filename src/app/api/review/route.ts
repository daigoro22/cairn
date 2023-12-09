import { REVIEW_TIMELINE_DEFAULT_QUERY_LIMIT } from '@/constants/supabase';
import { reviewTimelineApiSchema } from '@/schemas/reviews';
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
      'id, item_image_url, item_name, objective, rating, objective_completion_percent, purchase_date',
    )
    .limit(Number(limit))
    .order('updated_at', { ascending: true });

  const reviewData = data?.map(
    ({
      id,
      item_name,
      item_image_url,
      rating,
      objective,
      objective_completion_percent,
    }) => ({
      id,
      itemName: item_name,
      itemImageUrl: item_image_url,
      rating,
      objective,
      objectiveCompletionPercent: objective_completion_percent,
    }),
  );

  const parsed = reviewTimelineApiSchema.safeParse({
    error: statusText,
    data: reviewData,
  });

  console.log(data);

  return NextResponse.json(
    { error: statusText, data: reviewData },
    {
      status,
    },
  );
}
