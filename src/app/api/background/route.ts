import { backgroundEditApiSchema } from '@/schemas/background';
import { createRouterClient } from '@/utils/supabase';
import { randomUUID } from 'crypto';
import { isValid } from 'date-fns';
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

  //FIXME: delete, upsert をトランザクションで処理する
  const bgIds =
    (await supabase.from('backgrounds').select('id')).data?.map(
      ({ id }) => id,
    ) ?? [];
  const inputBgIds = parsedBody.data.items.map(
    ({ backgroundId }) => backgroundId,
  );
  const toBeDeletedBgs = bgIds.filter((b) => !inputBgIds.includes(b));
  await supabase.from('backgrounds').delete().in('id', toBeDeletedBgs);

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
          end_date: isValid(new Date(endDate)) ? endDate : undefined,
        }),
      ),
      { onConflict: 'id' },
    )
    .select();

  console.error(dbError);

  return NextResponse.json({ error: statusText, data }, { status });
}

export async function GET() {
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

  const {
    data,
    status,
    statusText,
    error: dbError,
  } = await supabase
    .from('backgrounds')
    .select('id, name, school_code, start_date, end_date');

  console.error(dbError);

  return NextResponse.json(
    {
      error: statusText,
      data: {
        items: data?.map(({ id, name, school_code, start_date, end_date }) => ({
          backgroundId: id,
          organizationName: name,
          schoolCode: school_code,
          startDate: start_date,
          endDate: end_date,
        })),
      },
    },
    { status },
  );
}
