# AutoLounge Min Garasje 🚗

**En mobilvennlig skoleprototype laget med AI (Vibe Coding).** Prosjektet er inspirert av en reell utfordring hos AutoLounge AS, som driver med dekk, felger og dekkhotell i Norge.

Hver sesong så må Auto Lounge AS kontakte en og en kunde for å gi dem tilbud på nye dekk dersom deres dekk er slitt på dekkhotellet.
Målet er å gjøre det enklere for dekkhotellkunder å se dekkstatus, vurdere personlige tilbud og gi beskjed til verkstedet – uten at alle må kontaktes på telefon.

> **Viktig:** Dette er en demonstrasjon med fiktive data, ikke en ekte kundeportal eller en integrasjon med Eontyre.

## 🔗 Se prosjektet

- **Demovideo:** [Se demovideo på YouTube](https://youtu.be/AUY8g1Wwctg)
- **Kildekode:** [Denne GitHub-repositoriemappen.](https://github.com/ozair1706/autolounge-min-garasje)

## 📸 Skjermbilder

**Verkstedets oversikt**

<img width="2838" height="1458" alt="image" src="https://github.com/user-attachments/assets/be686568-ef89-422e-9a76-ae0706019d8e" />


**Kundens Min Garasje**

<img width="530" height="1462" alt="image" src="https://github.com/user-attachments/assets/4e5e6982-930b-4f7a-9a81-afca9296a783" />


## ✨ Tre hovedfunksjoner

### 1. Import og dekkhotelloversikt

En ansatt kan importere en Eontyre-lignende testfil i **Excel (.xlsx), JSON (.json) eller CSV (.csv)**. Appen organiserer kundens biler og hjulsett, viser dekkdimensjoner og mønsterdybder og fremhever hjulsett som bør vurderes av verkstedet. Flere biler kan høre til samme kunde.

### 2. Personlige dekktilbud

Verkstedet kan opprette **tre alternativer** for et valgt hjulsett: budsjett, anbefalt og premium. Hvert tilbud har eget merke, pris og beskrivelse.

### 3. Kundens Min Garasje

Kunden kan se sine demobiler og dekk, velge ett av tilbudene eller be om å bli oppringt. Kundens valg dukker opp i verkstedets oversikt, hvor den ansatte kan bekrefte forespørselen.

## ▶️ Slik prøver du appen

1. Last ned prosjektet fra GitHub og pakk ut filene.
2. Åpne **`index.html`** i nyere Chrome eller Edge.
3. Gå til **Dekkhotell** for å se de fiktive dekkhotellkundene.
4. Velg **Importer Excel / JSON / CSV** og prøv en fil fra `testdata/`.
5. Gå til **Lag tilbud**, velg et hjulsett og publiser tre tilbud.
6. Gå til **Kundeapp** og velg et tilbud som demokunde.
7. Gå tilbake til **Oversikt** og bekreft kundens svar.

Du kan også bruke **Nullstill demo** for å begynne på nytt.

## 🤖 Hvordan jeg brukte generativ AI

Jeg brukte **ChatGPT** som hjelp under idéutvikling, design, programmering, feilsøking og testing. Prosessen var iterativ:

1. Jeg beskrev en utfordring fra arbeidsplassen min: mye manuell oppringning av dekkhotellkunder som kan trenge nye dekk.
2. Vi undersøkte arbeidsflyten og eksportfeltene i Eontyre og valgte å bygge en **separat skoleprototype**, ikke et nytt verkstedsystem.
3. AI hjalp med HTML, CSS og JavaScript, inkludert import, tilbudslogikk og kundevisning.
4. Etter testing ble en feil i vurderingen av vinterdekk rettet. Importfunksjonen ble også forbedret fra kun CSV til **Excel, JSON og CSV**.
5. Jeg justerte designet med AutoLounge-logoen og roligere blåfarger, og prototypen ble kontrollert i mobilstørrelse.

Dette prosjektet viser hvordan naturlige språkbeskrivelser kan brukes til å utvikle og forbedre en fungerende app uten avansert programmeringsbakgrunn.

## ✅ Testing

Følgende er kontrollert med **fiktive testdata**:

- Import av Excel, JSON og CSV.
- Gruppering av flere biler per kunde og visning av mønsterdybder.
- Opprettelse og publisering av tre tilbud.
- Kundens tilbudsvalg og forespørsel om oppringning.
- Bekreftelse av svar i verkstedoversikten.
- Lagring av demoendringer og nullstilling.
- Tilpasning til mobilskjerm.

Se [`TESTRAPPORT.md`](TESTRAPPORT.md) for mer detaljer og testbegrensninger.

## 🛠️ Teknologi og filer

Appen er laget med **HTML, CSS og JavaScript**, uten server eller database. Demosvar lagres lokalt i nettleseren (`localStorage`), og er derfor **ikke synlige fra andre enheter**.

| Fil/mappe | Innhold |
|---|---|
| `index.html` | Appens grensesnitt |
| `styles.css` | Design og mobiltilpasning |
| `app.js` | Import, dekkoversikt, tilbud og kundesvar |
| `testdata/` | Fiktive Eontyre-lignende Excel-, JSON- og CSV-filer |
| `assets/` | AutoLounge-logo |
| `skjermbilder/` | Bilder fra appen |
| `TESTRAPPORT.md` | Testresultater og begrensninger |
| `INNLEVERING.md` | Tekstforslag for Canvas |
| `PUBLISERING.md` | Veiledning til GitHub Pages |

## 🔒 Begrensninger og personvern

Denne appen er **kun en skoleprototype**. Den har ikke ekte kundeinnlogging, live kobling til Eontyre, SMS-varsler, betalingsløsning, lagerreservasjon eller en felles database. Den er ikke egnet til ekte kundehenvendelser.

**Ikke last opp ekte Eontyre-eksporter eller personopplysninger til GitHub, Vibe Off eller andre offentlige tjenester.** Bruk kun de medfølgende fiktive testfilene. Appens dekkvurderinger og priser er eksempler og skal ikke brukes som sikkerhets- eller kjøpsråd.

## 🚀 Mulig videreutvikling

En senere bedriftsversjon kunne hatt sikker innlogging, automatisk synkronisering med Eontyre (hvis tillatt av API-et), varsler til kundene og ordrebehandling med kontroll av lager og priser. **Disse funksjonene inngår ikke i skoleoppgaven.**

---

*Laget som et Vibe Coding-skoleprosjekt med utgangspunkt i AutoLounge AS.*
