-- J6: Ekzekutoje në Supabase SQL Editor PAS setup.sql.
-- Mos ekzekuto enable_demo_insert.sql pas këtij skedari.
begin;

alter table public.eventet
  add column if not exists pronari_id uuid references auth.users(id) default auth.uid();
alter table public.eventet alter column pronari_id set default auth.uid();
alter table public.eventet enable row level security;

-- Eventet ekzistuese demonstruese mbeten pa pronar.
-- Çdo event i ri nga aplikacioni duhet t'i përkasë përdoruesit të hyrë.
drop policy if exists "Demo: anon mund të shtojë evente" on public.eventet;
revoke insert on public.eventet from anon;
grant select, insert on public.eventet to authenticated;
grant usage on sequence public.eventet_id_seq to authenticated;

drop policy if exists "Përdoruesit e hyrë lexojnë eventet" on public.eventet;
create policy "Përdoruesit e hyrë lexojnë eventet"
  on public.eventet for select to authenticated
  using (true);

drop policy if exists "Pronari shton eventin e vet" on public.eventet;
create policy "Pronari shton eventin e vet"
  on public.eventet for insert to authenticated
  with check (
    (select auth.uid()) = pronari_id
    and char_length(trim(titulli)) between 1 and 120
    and char_length(trim(vendi)) between 1 and 160
    and char_length(trim(pershkrimi)) between 1 and 1200
    and data >= current_date
  );

commit;
