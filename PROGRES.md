# PROGRES · J5

## Çka punon

M1 është verifikuar në telefon sipas konfirmimit të përdoruesit: `.env` është vendosur, `supabase/setup.sql` është ekzekutuar dhe eventet shembull shfaqen. Screenshot-i për dorëzim është ruajtur. M2 dhe M3 janë implementuar në kod, por shtimi publik demonstrues nuk është aktivizuar.

## Çka bëri agjenti

1. Shtoi klientin Supabase që përdor vetëm URL-në dhe publishable/anon key nga variablat e mjedisit; `.env` injorohet nga Git.
2. Përgatiti tabelën `eventet`, katër rreshta shembull dhe lexim publik me RLS; aplikacioni tregon gjendjet e ngarkimit, gabimit dhe listës bosh.
3. Shtoi formën demonstrative, filtrat dhe ekranin e detajeve. Leja anonime për insert është ndarë në SQL tjetër dhe nuk është ekzekutuar.

## Çka mësuam / çka nuk e kuptuam

Lidhja reale me Supabase dhe leximi i eventeve u konfirmuan në telefon. Insert-i demonstrues do t’i lejonte çdo përdoruesi me publishable key të shtojë evente, prandaj politika e tij nuk është aktivizuar.

## Hapi tjetër

M1 është gati për dorëzim. Nëse kërkohet edhe M2/M3, provo filtrat dhe detajet në telefon; për insert-in përdor `supabase/enable_demo_insert.sql` vetëm për demonstrim, jo në prodhim pa autentikim ose moderim.
