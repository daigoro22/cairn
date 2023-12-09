import { reviewEditApiSchema } from '@/schemas/reviews';
import { createRouterClient } from '@/utils/supabase';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: { reviewId: string } },
) {
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
  const parsedBody = reviewEditApiSchema.safeParse(await request.json());
  const reviewId = params.reviewId;
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: 'フォーム入力が不正です' },
      { status: 400 },
    );
  }
  const {
    itemName: item_name,
    itemCode: item_code,
    itemImageUrl: item_image_url,
    rating,
    itemUrl: item_url,
    purchaseDate: purchase_date,
    objective,
    daysForObjectiveAchievement: days_for_objective_achievement,
    objectiveCompletionPercent: objective_completion_percent,
    review,
  } = parsedBody.data;

  const { statusText, status, data } = await supabase
    .from('reviews')
    .update({
      user_id: user.id,
      rating,
      item_name,
      item_code,
      item_url,
      item_image_url,
      purchase_date,
      objective,
      days_for_objective_achievement,
      objective_completion_percent,
      review,
      status: 2,
    })
    .filter('id', 'eq', reviewId);

  if (status === 204 || status === 304) {
    return new Response(null, { status });
  } else {
    return NextResponse.json(
      { error: statusText, data },
      {
        status,
      },
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { reviewId: string } },
) {
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

  const { statusText, status, data } = await supabase
    .from('reviews')
    .select('*')
    .filter('id', 'eq', params.reviewId)
    .limit(1);

  const reviewData = data?.map(
    ({
      id,
      user_id,
      item_name,
      item_code,
      item_image_url,
      rating,
      item_url,
      purchase_date,
      objective,
      days_for_objective_achievement,
      objective_completion_percent,
      review,
    }) => ({
      id,
      userId: user_id,
      itemName: item_name,
      itemCode: item_code,
      itemImageUrl: item_image_url,
      rating,
      itemUrl: item_url,
      purchaseDate: purchase_date,
      objective,
      daysForObjectiveAchievement: days_for_objective_achievement,
      objectiveCompletionPercent: objective_completion_percent,
      review,
    }),
  )[0];

  if (status === 204 || status === 304) {
    return new Response(null, { status });
  } else {
    return NextResponse.json(
      { error: statusText, data: reviewData },
      {
        status,
      },
    );
  }
}
