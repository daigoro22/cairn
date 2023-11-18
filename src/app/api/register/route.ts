import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }) {
  const { email, password } = await request.json();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(error.message);

  return NextResponse.json(data);
}
