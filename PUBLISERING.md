# Gratis publisering med GitHub Pages

Dette er en statisk app og trenger ikke Vercel, server, database eller betalt abonnement.

## 1. Opprett GitHub-repositorium

1. Logg inn på `https://github.com` (lag gratis konto ved behov).
2. Velg **New repository**.
3. Kall det for eksempel `autolounge-min-garasje`.
4. Velg **Public** for å få gratis GitHub Pages med vanlige innstillinger.
5. Opprett repositoriet.

## 2. Last opp kildekoden

1. Pakk ut ZIP-filen først.
2. I det nye repositoriet: **Add file → Upload files**.
3. Last opp `index.html`, `styles.css`, `app.js`, `README.md`, `INNLEVERING.md`, `PUBLISERING.md`, `TESTRAPPORT.md`, hele `testdata`-mappen og gjerne `skjermbilder`-mappen.
4. Sørg for at `index.html` ligger i **roten** av repositoriet (ikke i en ekstra undermappe).
5. Velg **Commit changes**.

## 3. Skru på GitHub Pages

1. Gå til repositoriets **Settings → Pages**.
2. Under **Build and deployment**, velg **Deploy from a branch**.
3. Velg **main** og **/(root)**, og klikk **Save**.
4. Vent noen minutter, og åpne lenken GitHub viser. Ofte ligner den på `https://BRUKERNAVN.github.io/autolounge-min-garasje/`.

## 4. Kontroller og lever

1. Åpne Pages-lenken på PC og mobil.
2. Trykk gjennom en full demo, gjerne med eksempelfilen. Ikke last opp ekte kunder eller nøkler.
3. Kopier GitHub Pages-lenken og lenken til repositoriet til `INNLEVERING.md` og innleveringen på Canvas.
4. Hvis skolen ønsker video i stedet for live demo, kan du ta opp skjermen mens du viser funksjonene og levere YouTube-lenken.

## Viktig sikkerhetsregel

Ikke legg eksportfiler (Excel/JSON/CSV) med ekte kundenavn, kontaktinformasjon, bilskilt, bookingkode eller `[Booking secret]` i GitHub-repositoriet. Den medfølgende testfilen inneholder oppdiktede verdier og er ment for publisering.

## Ingen deling av lokale svar

Github Pages leverer kun HTML/CSS/JS. Det finnes ingen felles database. Kundesvar du registrerer på din maskin vises **ikke** på en annen maskin. Dette er riktig for skoleprototypen, men skal ikke brukes som reell salgsprosess.
