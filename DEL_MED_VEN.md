# Sådan deler du DanskPath med venner — uden at sammenligne med andre apps

Dette hæfte er lavet til at blive delt. Det er ikke en platform. Det er et arbejdshæfte.

## 3 måder at dele på

### 1. Hurtigst — del linket du har nu (virker i dag)

Du kører lige nu på:
- App: `http://localhost:5173` lokalt, preview: `https://5173-xxxx.e2b.app`
- API: `http://localhost:3001` (trial-database)

Preview-URL'en er offentlig. Send den via WhatsApp/SMS. Din ven åbner i Safari (iPhone) eller Chrome (laptop) og kan bruge alt med det samme.

**Fordele:** virker nu, ingen deploy.
**Ulemper:** linket udløber når sandbox stopper. Database kun lokalt.

**Sådan:**
1. Kopiér din preview-URL (se øverst i Arena)
2. Tilføj `?friend=true&invitedBy=DitNavn` — f.eks. `https://5173-xxx.e2b.app/?friend=true&invitedBy=Anna`
3. Send via WhatsApp: `https://wa.me/?text=Prøv mit dansk-hæfte: URL`
4. Din ven tager 15-min test → resultat gemmes i `trial-results.json` på din server

---

### 2. Permanent — deploy til Vercel / Netlify (anbefalet)

Dette giver dig et fast link som `danskpath.vercel.app` du kan dele for altid.

**Frontend (statisk):**
```bash
npm run build
# dist/ mappen er nu klar
```
- Gå til vercel.com → Add New → Project → Upload `dist`
- Eller netlify.com → Sites → Drag & drop `dist`
- Du får et link. Del det.

**Backend (valgfri, for database):**
- `server.js` kører Express med `/api/trial`, `/api/survey`, `/api/stats`, gemmer til `trial-results.json`
- Deploy til Render.com / Railway / Fly.io:
  - New Web Service → connect repo → Start command: `node server.js` → Port 3001
- Ret i `src/components/ShareTrialView.jsx`: `const API_BASE = 'https://din-server.onrender.com'`
- Nu virker trial-databasen for alle venner, også efter du lukker laptop.

**Uden backend:** Appen virker stadig 100% — tracking i localStorage, men ingen fælles database. Trial-resultat vises kun lokalt.

---

### 3. QR + iPhone — så det ligger som app-ikon

1. Åbn din permanente URL (fra metode 2) i Safari på iPhone
2. Del-ikon (firkant med pil op) → "Føj til hjemmeskærm"
3. Nu ligger DanskPath som app-ikon, fuldskærm, offline-klar (localStorage)

QR genereres automatisk i Del-siden: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=URL`

---

## Hvad får din ven?

- 15-min test (20 spørgsmål) — ORD/V2, TID/datid, KØN/en-et, BØJ/adjektiv, PRÆ/vente på, VALG/kollokationer, lytning reduktioner, kultur Folketing/flexicurity/jantelov
- Resultat: niveau + hvordan målt (per skill breakdown) + hvad mangler + personlig sti
- Survey: NPS + fritekst → gemmes i database
- Reward: certifikat + unlocks (ikke hjerter/confetti)
- Derefter: fuldt arbejdshæfte med 761 + uendelig engine, 1052 ord SRS, 26 lyt, 18 samtale, 40 læs, 8 skriv, 12 udtale, 10 kultur, PD3 eksamen

**Ingen sammenligning:** Vi nævner ingen andre apps. Vi siger kun hvad dette hæfte er: et sted at arbejde 15–45 min om dagen, med forklaring før drill, engelsk først, nye varianter af samme regel.

---

## Template-engine — uendelige nye spørgsmål

- Hver skabelon har 15 sikre variable kombinationer → 5.100+ kontrollerede varianter
- `dedupKey = {emne}|{forfelt}|{verbum}|{subjekt}` huskes 30 dage (`recentlyShownRule`)
- Samme regel, nye ord hver gang — du lærer reglen, ikke svaret
- Implementeret i `src/lib/templateEngine.js` + `src/lib/pools.js`
- Tracking: `dansk_seen` map med timestamp, `getUnused` filtrerer <30 dage

Se side "Gentagelse" i appen for detaljeret tabel per øvelse.

---

## Ny layout — hvorfor anderledes?

- **Før:** sidebar med ikoner, runde cards, Duolingo-lignende
- **Nu:** avis/hæfte — tynd sort streg, varm papir #FFFCF7, serif overskrifter, uppercase labels, ingen ikoner i bundnav, kun tekst med streg aktiv
- **Princip:** Ingen streaks. Ingen hjerter. Kun arbejde der flytter dig. Forklaring før drill. Engelsk først, dansk bagefter. Hvorfor svaret er fristende — altid med.

Dette er bevidst anderledes. Vi er her for at gøre noget andet: give voksne med job og familie et seriøst sted at arbejde mod PD3.
