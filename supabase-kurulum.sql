-- Gönül Plak bulut kurulumu
-- Supabase > SQL Editor > New query > hepsini yapıştır > Run

create table if not exists public.songs (
  id text primary key,
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  title text, artist text, album text, year text,
  sp_id text, cover_url text,
  audio_path text, cover_path text,
  duration real, added bigint, updated bigint
);
alter table public.songs enable row level security;

drop policy if exists "kendi sarkilarim" on public.songs;
create policy "kendi sarkilarim" on public.songs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Şarkı dosyaları için gizli depo (herkes sadece kendi klasörünü görür)
insert into storage.buckets (id, name, public) values ('music', 'music', false)
on conflict (id) do nothing;

drop policy if exists "muzik oku" on storage.objects;
drop policy if exists "muzik yukle" on storage.objects;
drop policy if exists "muzik guncelle" on storage.objects;
drop policy if exists "muzik sil" on storage.objects;
create policy "muzik oku" on storage.objects for select
  using (bucket_id = 'music' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "muzik yukle" on storage.objects for insert
  with check (bucket_id = 'music' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "muzik guncelle" on storage.objects for update
  using (bucket_id = 'music' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "muzik sil" on storage.objects for delete
  using (bucket_id = 'music' and (storage.foldername(name))[1] = auth.uid()::text);
