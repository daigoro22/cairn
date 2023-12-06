DROP TABLE IF EXISTS backgrounds;
CREATE TABLE IF NOT EXISTS backgrounds (
    id uuid not null default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) not null,
    name VARCHAR(255) not null,
    school_code VARCHAR(13),
    start_date DATE not null,
    end_date DATE
);

ALTER TABLE backgrounds ENABLE ROW LEVEL SECURITY;

create policy "Users can update their own backgrounds."
  on backgrounds for all using (auth.uid() = user_id) with check (auth.uid() = user_id);