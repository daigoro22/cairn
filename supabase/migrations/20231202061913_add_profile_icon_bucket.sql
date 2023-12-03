-- Use Postgres to create a bucket.

insert into storage.buckets
  (id, name, file_size_limit, allowed_mime_types)
values
  ('profile_icons', 'profile_icons', 4194304,'{
  "image/png","image/jpg","image/jpeg"}'
);

create policy "Profile images are publicly accessible."
  on storage.objects for select using ( bucket_id = 'profile_icons' );

create policy "User can upload a profile icon."
  on storage.objects for insert with check ( bucket_id = 'profile_icons');

-- create policy "Users can update their own a profile icon."
--   on storage.objects for update with check ( bucket_id = 'profile_icons' AND uid() = owner );

-- create policy "Users can delete their own a profile icon."
--   on storage.objects for update with check ( bucket_id = 'profile_icons' AND uid() = owner );
