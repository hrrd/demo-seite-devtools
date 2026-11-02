# Campus-Café – Demo-Seite für Chrome DevTools

Statische Demo-Seite (HTML, CSS, Vanilla-JavaScript) mit vier absichtlich
eingebauten Fehlern für eine Live-Demo der Chrome DevTools.

## Starten

Lokal:

```bash
python -m http.server
```

Danach <http://localhost:8000> öffnen. (Die Seite nicht per `file://` öffnen,
sonst schlägt der `fetch` auf `tagesangebot.json` fehl.)

Vercel: Repository importieren, keine Einstellungen nötig (kein Framework,
kein Build-Befehl). `index.html` liegt im Wurzelverzeichnis.

## Dateien

| Datei               | Inhalt                                                  |
| ------------------- | ------------------------------------------------------- |
| `index.html`        | Kopf mit Logo, Abschnitte Speisekarte, Warenkorb, Tagesangebot |
| `style.css`         | Helles Layout                                           |
| `app.js`            | Summe, „Zur Kasse“, Laden des Tagesangebots             |
| `tagesangebot.json` | Drei Gerichte mit Name und Preis                        |
| `logo.png`          | Platzhalter-Logo (128 × 128 px)                         |

## Eingebaute Fehler (Spoiler)

| # | Datei        | Zeile | Fehler | Symptom | DevTools-Panel | Korrektur |
| - | ------------ | ----- | ------ | ------- | -------------- | --------- |
| 1 | `index.html` | 12    | Logo als `src="logo.pgn"` eingebunden, die Datei heißt `logo.png` | Kaputtes Bild im Kopf, 404 auf `logo.pgn` | Network, Console | `src="logo.png"` |
| 2 | `style.css`  | 66    | `.speisekarte-box { width: 600px; }` | Auf dem Handy (z. B. 375 px) läuft die Speisekarte rechts aus dem Bild, horizontales Scrollen | Device Toolbar, Elements/Styles | Regel entfernen (`.abschnitt` hat bereits `width: 100%; max-width: 600px`) |
| 3 | `app.js`     | 15    | `summe = summe + element.dataset.preis;` – `dataset` liefert Strings, `0 + "2.50"` wird zu `"02.50"` | „Summe berechnen“ zeigt `02.503.00 €` statt `5,50 €` | Sources (Breakpoint), Console | `summe = summe + Number(element.dataset.preis);` (Ausgabe in Zeile 17 dann z. B. über `formatierePreis(summe)`) |
| 4 | `app.js`     | 22    | `consol.log(...)` statt `console.log(...)` | „Zur Kasse“ tut scheinbar nichts, der Bestätigungshinweis erscheint nicht; `Uncaught ReferenceError: consol is not defined` | Console | `console.log(...)` |

Abgesehen von diesen vier Fehlern erscheinen keine weiteren Meldungen in der
Konsole (das Favicon ist als leeres `data:`-URI gesetzt, damit kein
zusätzlicher 404 auf `/favicon.ico` entsteht). Das Tagesangebot wird korrekt
geladen und angezeigt.
