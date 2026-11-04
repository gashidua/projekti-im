-- DEMO ONLY: this lets any app user with the public anon key insert events.
-- Do not run for a production app without authentication or moderation.
grant insert on public.eventet to anon;

drop policy if exists "Demo: anon mund të shtojë evente" on public.eventet;
create policy "Demo: anon mund të shtojë evente"
  on public.eventet
  for insert
  to anon
  with check (
    char_length(trim(titulli)) between 1 and 120
    and char_length(trim(vendi)) between 1 and 160
    and char_length(trim(pershkrimi)) between 1 and 1200
    and data >= current_date
    and kategoria in ('Muzikë', 'Teatër', 'Ceremoni', 'Lojëra', 'Sport')
  );
