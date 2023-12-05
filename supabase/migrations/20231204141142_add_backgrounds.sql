DROP TABLE IF EXISTS backgrounds;
CREATE TABLE IF NOT EXISTS backgrounds (
    id uuid not null default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    name VARCHAR(255) not null,
    school_code VARCHAR(13),
    start_date DATE not null,
    end_date DATE not null
);

ALTER TABLE backgrounds ENABLE ROW LEVEL SECURITY;

create policy "Users can update their own backgrounds."
  on backgrounds for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- DROP FUNCTION IF EXISTS public.update_backgrounds();
-- CREATE OR REPLACE FUNCTION public.update_backgrounds(new_name TEXT, new_school_code TEXT, new_start_date DATE, new_end_date DATE)
-- returns setof backgrounds
-- language plpgsql
-- security invoker
-- set search_path = public
-- as $$
-- begin
--   delete from backgrounds;
--   insert backgrounds (user_id, name, school_code, start_date, auth.uid(), name=new_name, school_code=new_school_code, start_date=new_start_date, end_date=new_end_date;
--   return new;
-- end;
-- $$;