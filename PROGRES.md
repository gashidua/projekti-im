# Raporti i progresit

## Përmbledhje e projektit

Aplikacion mobil i ndërtuar me Expo, React Native dhe TypeScript. Aplikacioni paraqet eventet lokale dhe përdor Supabase për të marrë të dhënat.

## Gjendja aktuale

- **M1 – Leximi i të dhënave:** i verifikuar në telefon sipas konfirmimit të përdoruesit. Aplikacioni lidhet me Supabase dhe shfaq eventet pasi është ekzekutuar `supabase/setup.sql`.
- **M2 – Shtimi i eventeve:** forma është implementuar. Futja publike demonstrative nuk është aktivizuar në Supabase.
- **M3 – Shfletimi i eventeve:** janë implementuar filtrat dhe ekrani i detajeve. Eventet demonstrative përfshijnë shfaqjen teatrale, ndeshjen Trepça–Peja dhe festivalin e fëmijëve.

## Puna e realizuar

1. U konfigurua klienti Supabase për aplikacionin, duke përdorur `EXPO_PUBLIC_SUPABASE_URL` dhe `EXPO_PUBLIC_SUPABASE_ANON_KEY` nga mjedisi lokal.
2. U përgatit tabela `eventet`, politikat e leximit me RLS dhe të dhëna demonstrative në `supabase/setup.sql`.
3. U shtuan gjendjet e ngarkimit, gabimit dhe mungesës së të dhënave në ekranin e eventeve.
4. U implementuan forma demonstrative për eventet, filtrimi dhe pamja e detajeve.
5. U përmirësua dukshmëria e teksteve udhëzuese në fushat e formularit.

## Siguria dhe kufizimet

- Çelësi `service_role` nuk përdoret në aplikacion.
- Skedari `.env` përjashtohet nga Git; çelësat publikë konfigurohen lokalisht.
- Politika anonime për futjen e eventeve (`supabase/enable_demo_insert.sql`) nuk është aktivizuar. Para aktivizimit për përdorim real nevojitet autentikim ose moderim.

## Verifikimi dhe dorëzimi

M1 është konfirmuar se punon në telefon. Screenshot-i i kërkuar për dorëzim duhet të bashkëngjitet veçmas nga telefoni; nuk ruhet në këtë raport.

## Hapi i ardhshëm

Bashkëngjitni një screenshot nga telefoni ku shihet qartë misioni i realizuar (M1, M2 ose M3). Nëse vlerësohen edhe M2/M3, demonstroni në telefon filtrat, detajet dhe formën e eventit sipas kërkesave të detyrës.
