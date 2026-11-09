# CLAUDE.md – Skills4Life Website

Diese Datei ist die verbindliche Arbeitsgrundlage für jede Änderung an skills4life.ch.
Lies sie vor jeder Aufgabe. Bei Widerspruch zwischen einer Anfrage und dieser Datei: nachfragen, nicht raten.

Quellen der Wahrheit: Brand Book und Visual Identity von Skills4Life (Stand November 2026). Diese Datei fasst sie für den Code zusammen.

---

## 0. Rolle und Arbeitsweise

Du bist Senior Frontend-Architekt und Brand-Hüter für Skills4Life. Der Auftraggeber (Diego) ist kein Entwickler. Er schreibt dir in einfacher Sprache, du übersetzt in saubere Umsetzung.

Bei jeder Anfrage:

1. **Verstehen.** Fasse in 1 bis 2 Sätzen zusammen, was du änderst. Bei Unklarheit höchstens 3 Fragen, dann handeln.
2. **Branch statt main.** Arbeite nie direkt auf `main`. Lege einen Branch an (Abschnitt 7).
3. **Umsetzen** nach den Regeln in dieser Datei.
4. **Prüfen** mit der Definition of Done (Abschnitt 9): Build, Lint, Typecheck, Tests, Mobile 375 px und Desktop 1440 px.
5. **Pull Request** öffnen, mit kurzer Beschreibung in einfachem Deutsch und dem Link zur Preview.
6. **Live erst nach OK.** Merge auf `main` (= live) nur, wenn Diego ausdrücklich «live», «go» oder «freigeben» schreibt. Ausnahme: reine Tippfehler-Korrekturen, wenn alle Checks grün sind.
7. **Berichten** in 2 bis 4 Sätzen: was geändert, wo die Preview ist, was offen ist. Kein Fachjargon.

Wenn eine Anfrage gegen die Marke verstösst (z. B. Notenversprechen, Emojis, erfundene Bewertungen), setze sie nicht um, sondern sage es und schlage eine markenkonforme Alternative vor.

---

## 1. Marke in Kürze

- **Was:** Lernbegleitung, die die Stärken von Kindern (11 bis 14) findet und darauf Erfolge aufbaut. Selbstvertrauen statt Nachhilfe.
- **Für wen:** Eltern (Persona «Sandra», 42, Raum Zürich): erschöpft, haben alles versucht, wollen Ruhe zu Hause und ein Kind, das wieder strahlt.
- **Kernsatz:** «Mehr Nachhilfe ist nicht die Antwort. Mehr Selbstvertrauen schon.»
- **Claim:** «Believe in yourself.»
- **Ablauf:** 1. Stärken entdecken · 2. Erfolge sichtbar machen · 3. Selbstvertrauen wächst.
- **Werte:** Sehen. Beweisen. Ermutigen.
- **Haltung:** Stärke zuerst. Wir versprechen Selbstvertrauen, keine Mathenote.

### Sprache und Ton

- Deutsch, **Schweizer Schreibweise** (ss statt ß). Eltern werden **gesiezt** («Ihr Kind»), Kinder geduzt.
- Kurze Sätze, ein Gedanke pro Satz, keine Fachbegriffe, ruhig und ohne Druck.
- Beginne Texte beim Alltag der Eltern, nicht bei der Methode.
- Zahlen und Etappen statt Superlative. Keine Ausrufezeichen.
- **Keine Emojis. Nirgends.** Wo ein Bild hilft: Piktogramme (Abschnitt 4.6).
- Nie Vorwürfe an Eltern, Kinder, Lehrpersonen oder frühere Anbieter.

### Was nie auf die Website kommt

- Noten- oder Prüfungsgarantien.
- Erfundene Zahlen, Bewertungen, Zitate oder Erfolgsgeschichten. Fehlt ein Fakt, setze einen Platzhalter wie `[PREIS]` oder `[DAUER]` und melde ihn.
- Erkennbare Kinderfotos oder Kindernamen ohne schriftliche Zustimmung der Eltern.
- Therapie- oder Diagnoseversprechen.
- Schulen und Vereine als Angebot, solange sie nicht live sind (höchstens ein dezenter Hinweis).

---

## 2. Design Tokens

**Regel:** Farben, Abstände, Radien, Schatten und Schriftgrössen kommen ausschliesslich aus Tokens. Keine Hex-Codes, keine px-Zahlen und keine `style="..."` im Komponenten-Code.

### 2.1 Farben

| Token | Wert | Verwendung |
|---|---|---|
| `--color-bg` | `#F0E7D8` | Seitenhintergrund (Sand), ca. 60 % |
| `--color-surface` | `#FAF6EF` | Karten, Badges, Formulare (Off-White) |
| `--color-surface-muted` | `#E2D8C8` | Ruhige Flächen, Bildplatzhalter, Linien |
| `--color-primary` | `#323E4D` | Buttons, dunkle Sektionen, Footer (Navy) |
| `--color-primary-hover` | `#26303C` | Hover und Active von Primary |
| `--color-on-primary` | `#FAF6EF` | Text und Icons auf Navy |
| `--color-text` | `#1A1A1A` | Headlines, Logo, starker Text (Ink) |
| `--color-text-muted` | `#5A5A5A` | Fliesstext, Captions (Grau) |
| `--color-border` | `#E2D8C8` | Trennlinien, Rahmen |
| `--color-success` | `#2D6A4F` | Nur Fortschritt, erreichte Etappen (Green) |
| `--color-spark` | `#C9A44C` | Der Funke: Punkte und Ringe, max. 5 %, **nie Text** (Gold) |
| `--color-focus` | `#323E4D` | Fokusring |

**Geprüfte Kontraste (WCAG AA, Text ab 4.5:1):**

| Vordergrund auf Hintergrund | Verhältnis | Erlaubt für |
|---|---|---|
| text auf bg | 14.2 : 1 | alles |
| text-muted auf bg | 5.6 : 1 | Fliesstext |
| text-muted auf surface | 6.4 : 1 | Fliesstext |
| text-muted auf surface-muted | 4.9 : 1 | Fliesstext, knapp |
| primary auf bg | 8.9 : 1 | Links, Icons |
| on-primary auf primary | 10.1 : 1 | Button-Text, Footer |
| success auf bg | 5.2 : 1 | Fortschritts-Labels |
| spark auf bg | 1.9 : 1 | **nur Deko, nie Text oder Icon mit Bedeutung** |

### 2.2 Typografie

Eine Schrift für alles: **Nunito** (Google Fonts), eingebunden über das Framework (z. B. `next/font/google`), Schnitte 400, 600, 700, 800. Fallback: `ui-rounded, system-ui, sans-serif`.

| Token | Grösse | Gewicht | Zeilenhöhe | Einsatz |
|---|---|---|---|---|
| `display` | `clamp(2.5rem, 5vw, 4rem)` | 800 | 1.08 | Hero-Headline, einmal pro Seite |
| `h1` | `clamp(2.25rem, 4vw, 3.25rem)` | 800 | 1.1 | Seitentitel |
| `h2` | `clamp(1.875rem, 3.2vw, 2.75rem)` | 800 | 1.1 | Sektionstitel |
| `h3` | `1.5rem` | 700 | 1.25 | Karten, Zwischentitel |
| `body-lg` | `1.25rem` | 400 | 1.6 | Lead-Text unter Headlines |
| `body` | `1.0625rem` | 400 | 1.6 | Fliesstext (17 px) |
| `small` | `0.9375rem` | 400 | 1.5 | Hinweise, Formular-Hilfen |
| `overline` | `0.875rem` | 700 | 1.4 | Grossbuchstaben, Laufweite 0.1em |
| `button` | `1.0625rem` | 600 | 1 | Buttons |

Headlines in Satzschreibung, Laufweite −0.01em. Fliesstext max. 65 Zeichen breit (`max-width: 65ch`). Nie mehr als 3 Gewichte auf einer Seite.

### 2.3 Spacing (8-px-Raster)

| Token | Wert | Typischer Einsatz |
|---|---|---|
| `space-1` | 4px | nur Icon-zu-Text-Abstand |
| `space-2` | 8px | enge Gruppen |
| `space-3` | 16px | Abstand in Karten, Seitenrand mobil |
| `space-4` | 24px | Karten-Padding, Seitenrand Desktop, Grid-Gap |
| `space-5` | 32px | Abstand zwischen Elementgruppen |
| `space-6` | 48px | Abstand Titel zu Inhalt einer Sektion |
| `space-7` | 64px | Sektion-Padding mobil |
| `space-8` | 96px | Sektion-Padding Desktop |

Nur diese Werte. 4px ausschliesslich für Icon-Abstände.

### 2.4 Radius, Schatten, Breiten

| Token | Wert | Einsatz |
|---|---|---|
| `radius-sm` | 8px | kleine Elemente, Tags |
| `radius-md` | 12px | Inputs |
| `radius-lg` | 20px | Karten, Bilder |
| `radius-pill` | 9999px | Buttons, Badges |
| `shadow-sm` | `0 1px 3px rgba(26,26,26,0.08)` | Badge |
| `shadow-cta` | `0 4px 12px rgba(50,62,77,0.20)` | nur primärer Hero-Button |
| `container` | max. 1200px, Seitenrand 16px mobil, 24px ab 768px | |

Sonst keine Schatten. Struktur entsteht durch Flächen und feine Linien.

### 2.5 Breakpoints

`sm 640px · md 768px · lg 1024px · xl 1280px`. Mobile first. Pflicht-Prüfbreiten: **375px** und **1440px**, zusätzlich 768px bei Layout-Änderungen.

### 2.6 Umsetzung im Code

Lege alle Tokens in **einer** Datei ab: `src/styles/tokens.css` als CSS-Variablen. Wird Tailwind genutzt, werden die Tokens dort angebunden (Tailwind v4: `@theme` in der globalen CSS-Datei; v3: `tailwind.config` mit `var(--...)`). Komponenten nutzen nur Token-Klassen wie `bg-primary`, `text-muted`, `p-4`, `rounded-lg`.

```css
:root {
  --color-bg: #F0E7D8;
  --color-surface: #FAF6EF;
  --color-surface-muted: #E2D8C8;
  --color-primary: #323E4D;
  --color-primary-hover: #26303C;
  --color-on-primary: #FAF6EF;
  --color-text: #1A1A1A;
  --color-text-muted: #5A5A5A;
  --color-border: #E2D8C8;
  --color-success: #2D6A4F;
  --color-spark: #C9A44C;
  --color-focus: #323E4D;

  --font-sans: "Nunito", ui-rounded, system-ui, sans-serif;

  --space-1: 4px;  --space-2: 8px;  --space-3: 16px; --space-4: 24px;
  --space-5: 32px; --space-6: 48px; --space-7: 64px; --space-8: 96px;

  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 20px; --radius-pill: 9999px;
  --shadow-sm: 0 1px 3px rgba(26, 26, 26, 0.08);
  --shadow-cta: 0 4px 12px rgba(50, 62, 77, 0.20);

  --container-max: 1200px;
}
```

---

## 3. Logo

- Dateien in `public/brand/`: `logo-schwarz.png` (Standard auf Sand), `logo-weiss.png` (auf Navy), `logo-navy.png`, `berg-schwarz.png` und `berg-weiss.png` (Signet allein). Sobald eine Vektordatei (SVG) existiert, ersetzt sie die PNGs.
- Immer über eine Komponente `<Logo variant="dark|light" />` einbinden, nie als lose `<img>`.
- Berg und Schriftzug bleiben zusammen, zentriert, in einer Farbe. Schutzraum rundum = Höhe des Bergs. Mindestbreite 120 px.
- Nicht verzerren, drehen, einfärben, mit Schatten versehen oder auf Gold/Grün setzen.
- Favicon und Social-Profilbild: Berg-Signet auf Sand.

---

## 4. UI/UX-Regeln

### 4.1 Grundsätze
- Ruhig, warm, viel Raum. Eine Botschaft pro Sektion.
- **Ein primärer CTA pro Bildschirmhöhe.** Hauptaktionen: «Situation Ihres Kindes einschätzen» (3 Minuten) und «Erstgespräch» (30 Minuten, kostenlos).
- Klare Hierarchie: Overline → Headline → Lead → Inhalt → CTA.

### 4.2 Buttons
| Variante | Aussehen | Einsatz |
|---|---|---|
| `primary` | Navy, Text Off-White, Pill, Pfeil → rechts | Hauptaktion |
| `secondary` | transparent, 1px Rahmen Navy, Text Navy, Pill | Zweitaktion |
| `link` | Text Navy, fett, Pfeil → | in Karten und Fliesstext |

Mindesthöhe 48px, Padding 16px × 32px, Hover = `primary-hover`, sichtbarer Fokusring (2px `--color-focus`, 2px Abstand). Ein Button-Text sagt, was passiert («Erstgespräch anfragen», nicht «Absenden»).

### 4.3 Karten
Fläche `surface`, Radius `radius-lg`, Padding `space-4` bis `space-5`, kein Schatten. Nummerierte Schritte: Zahl in einem 44px-Kreis auf `bg`.

### 4.4 Formulare
- Jedes Feld hat ein sichtbares `<label>`, kein Placeholder als Label.
- Inputs: Höhe mind. 48px, Radius `radius-md`, Rahmen `text-muted`, Hintergrund weiss.
- Fehlermeldung unter dem Feld in klaren Worten, nicht nur farbig.
- Möglichst wenige Felder (Name, Kontakt, Alter des Kindes). Datenschutzhinweis mit Link direkt beim Absenden.

### 4.5 Etappen-Leiste (Markenelement)
5 Punkte mit Linien verbunden: erreicht = gefüllt `success`, aktuell = Ring `spark`, offen = Ring `text-muted`. Als Komponente `<StageTrack current={n} total={5} />` mit `aria-label` («Etappe 3 von 5»).

### 4.6 Piktogramme statt Emojis
- Ein einziges Set: **Lucide** (`lucide-react` o. ä.). Keine anderen Icon-Bibliotheken mischen.
- Nur Linie, Strichstärke 1.75, Grösse 20, 24 oder 32px, Farbe `text` oder `primary`, auf Navy `on-primary`.
- Icons stehen immer neben Text. Dekorative Icons `aria-hidden="true"`, alleinstehende Icon-Buttons mit `aria-label`.

### 4.7 Bilder
- Warmes, natürliches Licht. Hände, Silhouetten, Details. Keine Stockfotos mit Daumen hoch.
- Kinder nicht erkennbar, ausser mit schriftlicher Zustimmung.
- Immer: `alt`-Text, feste Seitenverhältnisse (kein Layout-Springen), modernes Format (AVIF/WebP), Lazy Loading ausser im Hero.

### 4.8 Barrierefreiheit (WCAG 2.1 AA)
- Nur Farbpaare aus der Kontrasttabelle (2.1).
- Ganze Seite per Tastatur bedienbar, Fokus immer sichtbar, logische Überschriftenreihenfolge (eine H1 pro Seite).
- Touch-Ziele mind. 44 × 44 px.
- `prefers-reduced-motion` respektieren. Animationen dezent, max. 200 ms, nie Pflicht zum Verstehen.
- `lang="de-CH"` im HTML.

### 4.9 Performance-Budget
Lighthouse mobil: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. LCP < 2.5 s, CLS < 0.1. Keine unnötigen Bibliotheken.

---

## 5. Architektur

Bestehendes Setup zuerst prüfen (vermutlich Next.js). Die folgende Struktur ist das Ziel; bestehenden Code schrittweise dorthin migrieren, nicht alles auf einmal.

```
src/
  app/ (oder pages/)       Seiten und Routen, nur Zusammensetzung, keine Styles
    page.tsx               Startseite
    familien/              Unterseite Familien
    impressum/             Impressum
    datenschutz/           Datenschutzerklärung
  components/
    ui/                    Kleine Bausteine: Button, Card, Badge, Input, Icon, Logo, StageTrack
    sections/              Seitenabschnitte: Hero, PainPoints, Process, NotWhatWeDo, Founder, Contact, Footer
    layout/                Header, Container, Section
  content/                 Alle Texte als Daten (z. B. home.ts, familien.ts), getrennt vom Layout
  styles/
    tokens.css             Einzige Quelle für Design Tokens
    globals.css            Reset, Basis-Typografie, Token-Import
  lib/                     Hilfsfunktionen (z. B. Formular-Versand, SEO-Helfer)
public/
  brand/                   Logos und Favicon
  images/                  Optimierte Bilder
tests/
  e2e/                     Playwright: Smoke-Tests und Screenshots 375/1440
```

Regeln:
- **Eine Komponente pro Datei**, Name in PascalCase, Props typisiert (TypeScript).
- **Texte in `src/content/`**, nicht im JSX. So kann Diego Texte ändern lassen, ohne Layout zu berühren.
- **Sections nutzen nur `ui/`-Bausteine und Tokens.** Keine Einzellösungen, keine Kopien bestehender Komponenten.
- Vor einer neuen Komponente prüfen, ob eine bestehende erweitert werden kann.
- Keine toten Dateien, keine auskommentierten Codeblöcke.
- Abhängigkeiten nur nach Rückfrage hinzufügen.

---

## 6. SEO, Recht und Daten

- Pro Seite: eigener `<title>` (≤ 60 Zeichen) und Meta-Description (≤ 155 Zeichen), Open-Graph-Bild, kanonische URL.
- Strukturierte Daten: `LocalBusiness` bzw. `EducationalOrganization` mit Adresse und Telefon.
- `sitemap.xml` und `robots.txt` automatisch erzeugen.
- **Impressum und Datenschutzerklärung** (Schweizer DSG) sind Pflicht und im Footer verlinkt. Inhalte nicht erfinden: Platzhalter setzen und Diego um die rechtlich geprüften Texte bitten.
- Formulardaten nur so weit erheben wie nötig. Keine Tracking-Tools ohne Rückfrage. Falls Analytics, dann datenschutzfreundlich und ohne Cookies.

---

## 7. Git-Workflow

- `main` = live. Niemals direkt auf `main` committen oder pushen.
- Branch pro Aufgabe: `feat/...` (neu), `fix/...` (Fehler), `content/...` (nur Text), `chore/...` (Technik). Beispiel: `content/hero-neuer-kernsatz`.
- Commits nach Conventional Commits, kurz und auf Deutsch: `feat: Etappen-Leiste auf Startseite`, `fix: Button-Kontrast im Footer`.
- Jede Änderung über einen Pull Request mit:
  - Was wurde geändert (1 bis 3 Sätze, verständlich für Nicht-Entwickler)
  - Preview-Link
  - Screenshots 375px und 1440px bei sichtbaren Änderungen
  - Checkliste aus Abschnitt 9
- Merge nur bei grünen Checks und Freigabe durch Diego. Danach Branch löschen.
- **Rollback:** Geht live etwas kaputt, sofort `git revert` des Merge-Commits über einen neuen PR, dann Ursache beheben.

---

## 8. CI/CD

### 8.1 Ablauf
1. Branch pushen → **GitHub Actions** startet die Checks.
2. Hosting (z. B. Vercel oder Netlify) erstellt automatisch eine **Preview-URL** für den PR.
3. Diego prüft die Preview und gibt frei.
4. Merge auf `main` → automatisches **Production-Deployment**.

### 8.2 Pflicht-Checks in `.github/workflows/ci.yml`
| Schritt | Werkzeug | Bricht ab, wenn … |
|---|---|---|
| Install | `npm ci` (mit Cache) | Lockfile fehlt oder kaputt |
| Lint | ESLint, Stylelint oder Tailwind-Lint | Regeln verletzt, Hex-Codes ausserhalb von `tokens.css` |
| Format | Prettier `--check` | Code unformatiert |
| Typecheck | `tsc --noEmit` | Typfehler |
| Build | Framework-Build | Build schlägt fehl |
| E2E und A11y | Playwright + `@axe-core/playwright` auf 375px und 1440px | Seite lädt nicht, A11y-Verstösse |
| Lighthouse | Lighthouse CI mit Budget aus 4.9 | Werte unter Budget |

Zusätzlich ein einfacher Check, der den Build abbrechen lässt, wenn im Code Emojis oder Hex-Codes ausserhalb von `tokens.css` vorkommen.

### 8.3 Einmalige Einrichtung (Claude führt Diego Schritt für Schritt durch)
- Branch Protection auf `main`: Pull Request Pflicht, alle Checks müssen grün sein, kein Force-Push.
- Hosting mit GitHub verbinden: Preview-Deployments für jeden PR, Production nur von `main`.
- Secrets (z. B. für Formular-Versand) nur als Umgebungsvariablen im Hosting und in GitHub, nie im Code.
- Dependabot für Sicherheitsupdates aktivieren.

---

## 9. Definition of Done (für jede Änderung)

- [ ] Inhalt markenkonform: Sie-Form, Schweizer ss, keine Emojis, keine erfundenen Fakten, keine Notenversprechen
- [ ] Nur Tokens verwendet, keine Hex-Codes oder freien px-Werte in Komponenten
- [ ] Bestehende `ui/`-Komponenten genutzt oder sauber erweitert
- [ ] Geprüft auf 375px und 1440px, kein horizontales Scrollen
- [ ] Tastatur-Bedienung und Fokus geprüft, Kontraste aus der Tabelle
- [ ] Bilder mit `alt`, Seitenverhältnis fix, optimiert
- [ ] Lint, Typecheck, Build, Tests und Lighthouse grün
- [ ] PR mit verständlicher Beschreibung, Preview-Link und Screenshots
- [ ] Freigabe von Diego vor dem Merge

---

## 10. Entscheidungen von Diego (gehen den Regeln oben vor)

- **Haupt-Branch heisst `master`**, nicht `main`. Alles, was oben für `main` gilt, gilt für `master`.
- **Schulen und Vereine** bleiben auf der Startseite als gleichwertige Auswahl. Ihre Seiten zeigen «bald verfügbar», bis sie live gehen.
- **Emanuele:** Die schriftliche Zustimmung der Eltern liegt vor. Nur der Vorname darf genannt werden.
- **Logo-Intro** auf der Startseite: rund 1.5 Sekunden ist erlaubt (Ausnahme zur 200-ms-Regel). Alle anderen Animationen bleiben dezent.
- **Hintergrund-Video** auf /familien: läuft bei allen automatisch im Loop, ohne sichtbaren Knopf, auch bei «Bewegung reduzieren».
- **Erfolgsgeschichten** auf /familien: Die Reihe bewegt sich automatisch im Loop, auch bei «Bewegung reduzieren». Sie stoppt, solange die Maus darauf liegt.

---

## 11. Erste Aufgabe in diesem Repo (einmalig)

Bevor du gestalterisch etwas änderst, gehe in dieser Reihenfolge vor und hole nach jeder Phase ein OK ein:

1. **Bestandsaufnahme:** Framework, Ordnerstruktur, Hosting, bestehende Styles, vorhandene Tests und Workflows. Bericht in einfacher Sprache mit den grössten Abweichungen zu dieser Datei.
2. **Fundament:** `tokens.css` anlegen, Nunito sauber laden, Basis-Komponenten (`Button`, `Card`, `Container`, `Section`, `Logo`, `Icon`, `StageTrack`) bauen, Logos nach `public/brand/` legen.
3. **CI/CD:** Workflow aus Abschnitt 8 einrichten, Diego bei Branch Protection und Preview-Deployments anleiten.
4. **Migration:** Startseite Sektion für Sektion auf die neuen Komponenten umbauen, Texte nach `src/content/` verschieben. Je Sektion ein PR.
5. **Pflichtseiten:** Impressum und Datenschutz als Seiten mit Platzhaltern anlegen und im Footer verlinken.
