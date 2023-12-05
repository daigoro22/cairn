import { backgroundEditApiSchema } from '@/schemas/background';
import { createRouterClient } from '@/utils/supabase';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function PUT(request: NextRequest) {
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

  const parsedBody = backgroundEditApiSchema.safeParse(await request.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: 'フォーム入力が不正です' },
      { status: 400 },
    );
  }

  const {
    data,
    status,
    statusText,
    error: dbError,
  } = await supabase
    .from('backgrounds')
    .upsert(
      parsedBody.data.items.map(
        ({ backgroundId, organizationName, startDate, endDate }) => ({
          id: backgroundId ?? randomUUID(),
          user_id: user.id,
          name: organizationName,
          start_date: startDate,
          end_date: endDate,
        }),
      ),
      { onConflict: 'id' },
    )
    .select();

  console.error(dbError);

  return NextResponse.json({ error: statusText, data }, { status });
}
