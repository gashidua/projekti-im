# PROGRES · J5

## Çka punon

M1–M3 janë implementuar në kod: ekrani lexon eventet, filtron sipas kategorisë, hap detajet dhe ka formë për shtim. Nuk janë verifikuar në telefon ose kundër Supabase reale: `.env` mungon dhe SQL-ja ende nuk është ekzekutuar.

## Çka bëri agjenti

1. Shtoi klientin Supabase që përdor vetëm URL-në dhe publishable/anon key nga variablat e mjedisit; `.env` injorohet nga Git.
2. Përgatiti tabelën `eventet`, katër rreshta shembull dhe lexim publik me RLS; aplikacioni tregon gjendjet e ngarkimit, gabimit dhe listës bosh.
3. Shtoi formën demonstrative, filtrat dhe ekranin e detajeve. Leja anonime për insert është ndarë në SQL tjetër dhe nuk është ekzekutuar.

## Çka mësuam / çka nuk e kuptuam

Të dhënat reale mund të lexohen nga Supabase pasi të vendosen kredencialet lokalisht dhe të krijohet tabela. Ende nuk e dimë nëse projekti Supabase është konfiguruar saktë, sepse lidhja nuk është testuar; insert-i publik do t’i lejonte çdo përdoruesi të aplikacionit të shtojë evente.

## Hapi tjetër

Kopjo `.env.example` në `.env`, vendos URL-në dhe anon key pa i dërguar në chat, ekzekuto `supabase/setup.sql` në SQL Editor dhe provo listën në telefon. Për M2, shqyrto veçmas `supabase/enable_demo_insert.sql`; mos e përdor në prodhim pa autentikim ose moderim. Pastaj ruaj screenshot-in e telefonit për dorëzim.
