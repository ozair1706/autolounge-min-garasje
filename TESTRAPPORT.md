# Testrapport – AutoLounge Min Garasje

**Dato:** 21. oktober 2026

## Testet i automatisk Chromium-basert nettlesermiljø

| Test | Forventet resultat | Resultat |
|---|---|---|
| Starte appen | Oversikt med eksempeldata vises | Bestått |
| Vise dekkhotell | 7 fiktive hjulsett | Bestått |
| Sesongbasert filtrering | 3 hjulsett under interne oppfølgingsterskler | Bestått etter retting |
| Se detaljer | Mønsterdybder, bil og DOT vises | Bestått |
| Importere Eontyre-lignende CSV, JSON og Excel (.xlsx) | 6 hjulsett fra 4 fiktive kunder | Bestått |
| Skjerme identifiserende data | Opprinnelig testskilt vises ikke etter import | Bestått |
| Publisere tilbud | Tre redigerte tilbud vises i kundeappen | Bestått |
| Velge dekkpakke | Kundesvar vises i verkstedets oversikt | Bestått |
| Bekrefte kundevalg | Status endres til Bekreftet | Bestått |
| Be om oppringning | Forespørselen dukker opp i verkstedoversikten | Bestått |
| Lagre og gjenåpne data | Lagring kan gjenopprettes i ny side med samme testlagring | Bestått med testlagring |
| Tilbakestille demo | 7 opprinnelige hjulsett lastes inn | Bestått |
| Mobilbredde 390 px | Ingen horisontal sideoverflyt | Bestått |
| JavaScript-kjøretidsfeil | Ingen | Bestått i testløpet |

### Rettet feil under utviklingen

Første utgave behandlet vinterdekk som sommerdekk under statusvurdering fordi sesongfunksjonen fikk et objekt i stedet for sesongfeltet. Testen oppdaget at to hjulsett ble valgt i stedet for tre. Koden ble rettet, og ny test viste tre relevante hjulsett.

### Slik ble nettlesertest utført

Testmiljøet blokkerte direkte åpning av lokale filer/localhost i nettleseren. Derfor ble HTML, CSS og JavaScript lastet inn i et isolert nettleserdokument og testet med automatiserte brukerklikk. Nettleserens `localStorage` ble etterlignet for lagringstester; dette bekrefter lagrings-/gjenopprettingslogikk, men er **ikke** en ende-til-ende-test av nettleserlagring ved vanlig filåpning. Det anbefales å åpne `index.html` selv og prøve appen før innlevering.

### Ytterligere manuelt å kontrollere før levering

- Åpne `index.html` i din egen Chrome/Edge og last siden på nytt etter et tilbudsvalg.
- Test import av en **fiktiv** CSV med semikolon eller tabulator.
- Sjekk at Pages-lenken virker fra en annen maskin/mobil etter publisering.
- Bekreft at bare fiktive opplysninger finnes i prosjektet som publiseres.

## Ikke testet mot ekte tjenester

Ingen faktisk Eontyre-integrasjon, SMS, sikker pålogging, betaling, lagerreservasjon eller fakturering er implementert. De er utenfor rammen for skoleprototypen.


### Oppdatert 2026-10-21

Excel (.xlsx), JSON (.json) og CSV (.csv) ble testet i Chromium med den fiktive testeksporten. Alle tre importerte 6 hjulsett fra 4 kunder uten JavaScript-feil. Den komplette tilbuds-/kundesvarflyten ble testet på nytt.
