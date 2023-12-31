DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
    id uuid not null default gen_random_uuid() primary key,
    user_id uuid references user_details(id) not null,
    item_name TEXT not null,
    item_code TEXT not null,
    item_image_url TEXT,
    rating Real not null,
    item_url VARCHAR(255) not null,
    purchase_date DATE not null,
    objective TEXT not null,
    days_for_objective_achievement Integer not null,
    objective_completion_percent Integer not null,
    review TEXT not null
);

-- ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- create policy "Users can update their own reviews."
--   on reviews for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- create policy "Users can delete their own reviews."
--   on reviews for delete to authenticated using (auth.uid() = user_id);

-- create policy "Public profiles are visible to everyone."
--   on reviews for select to anon using ( true );