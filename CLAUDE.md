# AGENTS.md

## Projekti

Aplikacion celular për banorët e Mitrovicës që duan t’i zbulojnë eventet e ardhshme në një vend.

## Përdoruesi

Përdoruesi i synuar është banor/e i/e Mitrovicës që kërkon aktivitete dhe evente për të marrë pjesë. `BISEDAT.md` përmban pyetjet dhe shabllonet për tri biseda, por ende nuk ka gjetje reale të plotësuara. Mos shpik citime, përvoja apo nevoja; përditëso këtë seksion vetëm pasi të dokumentohen bisedat reale.

## Ekranet

- **Eventet:** listë e eventeve të ardhshme në Mitrovicë.
- **Kategoritë/filtrat:** zgjedhje sipas muzikës, teatrit, ceremonive, lojërave ose sportit.
- **Detajet e eventit:** data, ora, vendi, kategoria dhe përshkrimi.

Këto rrjedhin nga `HARTA.md`. Llogaritë, pagesat/biletat, komentet, bisedat/komuniteti, rekomandimet e personalizuara dhe njoftimet e avancuara janë jashtë MVP-së.

## Stack

- Expo SDK 58, React Native, TypeScript
- Supabase (`supabase-js`)
- Variablat në `.env`: `EXPO_PUBLIC_SUPABASE_URL` dhe `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Kurrë mos vendos `service_role` key në aplikacion ose në GitHub.
- Mbaje `.env` në `.gitignore` dhe mos lexo, shfaq apo ndrysho sekretet.

## Rregullat për agjentin

- Puno me hapa të vegjël: bëj vetëm një ndryshim në një kohë.
- Para çdo ndryshimi, shpjego shkurt çfarë do të ndryshosh dhe pse.
- Pyet para se të instalosh paketa.
- Mos prek `.env` ose sekrete.
- Pas një hapi që punon, bëj commit.
- Teksti i UI-së duhet të jetë në shqip.
- Për navigimin përdor Expo Router dhe mbaji ekranet në `src/app/`; komponentët dhe logjika e përbashkët jashtë `src/app/`.
- Para ndryshimeve në Expo/React Native, kontrollo versionin Expo dhe lexo dokumentacionin përkatës SDK 58: `https://docs.expo.dev/versions/v58.0.0/`.

## Statusi

- **M1:** gati në kod dhe i provuar në telefon sipas konfirmimit të përdoruesit; `.env`, SQL-ja bazë dhe screenshot-i janë përfunduar.
- **M2/M3:** funksionet janë në kod; insert-i publik demonstrues nuk është aktivizuar. Testo filtrat, detajet dhe shtimin veçmas nëse kërkohen për misionin e zgjedhur.
- **Kujdes:** `supabase/enable_demo_insert.sql` lejon shkrim anonim publik dhe është vetëm për demonstrim.

## Prompti i parë · shqip

> Jam student. Aplikacioni im është Expo SDK 58 (React Native + TypeScript) dhe po e lidh me Supabase. Produkti: aplikacion për banorët e Mitrovicës që duan t’i zbulojnë eventet e ardhshme në një vend. Ekrani im kryesor nga `HARTA.md`: Eventet. Punojmë me hapa të vegjël: bëj NJË ndryshim, shpjegoma në 3 fjali çka ndryshove dhe pse, dhe më thuaj si ta provoj në telefon. Mos ndrysho asgjë tjetër. Çelësat: vetëm publishable/anon key nga `.env` (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`), kurrë `service_role`; `.env` qëndron në `.gitignore`.

## First prompt · English

> I am a student. My app is Expo SDK 58 (React Native + TypeScript), and I am connecting it to Supabase. Product: an app for Mitrovica residents to discover upcoming events in one place. My main screen from `HARTA.md`: Events. We work in small steps: make ONE change, explain what you changed and why in 3 sentences, and tell me how to test it on my phone. Change nothing else. Keys: only the publishable/anon key from `.env` (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`), never `service_role`; `.env` stays in `.gitignore`.
