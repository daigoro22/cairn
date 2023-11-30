DROP TABLE IF EXISTS user_details;
CREATE TABLE IF NOT EXISTS user_details (
    id uuid references auth.users on delete cascade not null primary key,
    name VARCHAR(255),
    profile_icon_url VARCHAR(255),
    date_of_birth DATE,
    gender VARCHAR(50),
    terms_agreed BOOLEAN
);

-- ALTER TABLE user_details
-- ADD CONSTRAINT check_date_of_birth CHECK (date_of_birth <= CURRENT_DATE);

DROP FUNCTION IF EXISTS public.add_user_details();
CREATE OR REPLACE FUNCTION public.add_user_details()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_details (id, name, profile_icon_url, date_of_birth, gender,terms_agreed)
  values (new.id,
  new.raw_user_meta_data->>'name',
  new.raw_user_meta_data->>'profileImageURL',
  TO_DATE(new.raw_user_meta_data->>'dateOfBirth','YYYY/MM/DD'),
  new.raw_user_meta_data->>'gender',
  CAST(new.raw_user_meta_data->>'termsAgreed' AS BOOLEAN));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.add_user_details();