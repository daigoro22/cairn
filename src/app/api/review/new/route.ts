import { createRouterClient } from '@/utils/supabase';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
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

  try {
    const {
      data,
      status,
      statusText,
      error: reviewError,
    } = await supabase
      .from('reviews')
      .insert({
        title: '',
        user_id: user.id,
        item_name: '',
        item_code: '',
        item_image_url: '',
        rating: 0,
        item_url: '',
        purchase_date: format(new Date(), 'yyyy-MM-dd'),
        objective: '',
        days_for_objective_achievement: 0,
        objective_completion_percent: 0,
        review: '',
        status: 1,
      })
      .select('id')
      .limit(1);
    return NextResponse.json(
      { error: reviewError?.message ?? statusText, data: data?.[0] },
      { status },
    );
  } catch (e) {
    console.log(e);
  }
}
