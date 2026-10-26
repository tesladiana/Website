# Lady Tesla Diana — Split Build Report

Built 2026-10-26 from `work/index-4-original.html` (12,201,524 bytes, single file). The original was not modified; the split site was assembled programmatically (`work/build.py`, Crossy Cat code in `work/crossy.js`).

## Deliverables

- Site tree: `site/`
- Zip of the tree: `ladytesladiana-split.zip` (8.5 MB, 42 files)
- This report: `BUILD-REPORT.md`

## Final tree

```
site/
├── index.html                  31,547 bytes — hero, menu, News, Store, Story (Parts I–V + narration), Decrees, Lineage
├── games/index.html             5,333 bytes — Revels (Trivia, Jumpy Kitty, Crossy Cat)
├── music/index.html             4,530 bytes — Melodies (all royal audio elements + the 3 external-song buttons)
├── photos/index.html            4,524 bytes — Gallery (Photos) + lightbox
└── assets/
    ├── css/site.css            shared styles from the original <style> blocks (+ small cross-page nav styling)
    ├── css/games.css           the Revels styles (formerly injected into the shadow DOM)
    ├── js/site.js              navigation, falling-petals background, music player, narration, lightbox
    ├── js/games.js             Revels: Trivia + Jumpy Kitty + the new Crossy Cat
    ├── fonts/title-wave.ttf    the embedded "Title Wave" font, extracted
    └── media/                  33 files: favicon, hero images, 7 news images, 10 gallery images,
                                4 cat portraits, 4 royal songs (royal-3…6.mp3), 5 story narrations (narr-1…5.mp3)
```

Every HTML page is under 32 KB — the largest is ~0.27% of the original 11.6 MB file.

## Media extraction

All **34 embedded data URIs** were extracted to real files and every reference rewritten:

- 19 JPEG (hero ×2, news ×7, gallery ×10) → `assets/media/`
- 5 PNG (favicon + the 4 cat portraits `cat-tesla/berlioz/omalley/kableton.png`) → `assets/media/`
- 9 MP3 (royal-3…6, narr-1…5) → `assets/media/`
- 1 TTF ("Title Wave") → `assets/fonts/title-wave.ttf`

Verified by grep: **no `data:` URIs remain** in any HTML/CSS/JS file in the output.

## Split (structure Michael agreed to)

- Homepage (`index.html`, top level): hero + menu + News, Store, Story, Decrees, Lineage. Menu links for Melodies, Gallery and Revels now navigate to the new subfolder pages; the other menu links open their sections as before. Subfolder pages carry a small gold site-nav and a "back" link home, and `index.html#story`-style links open that section directly.
- `games/`, `music/`, `photos/` each hold one page in their own folder; subfolder pages reference shared assets via `../assets/…`. The black/gold/white look, fonts and layout are the original CSS, unchanged in spirit.
- The Revels shadow-DOM/template mechanism was replaced with plain page markup + `games.css`/`games.js` (same styles, same classes) — this is what made the game fixes below possible without touching Trivia/Jumpy behaviour.

## What was fixed / removed / built

1. **Syntax bug fixed.** The Revels script contained `function /*stopPetals*/(){…}` — a parse error that killed the entire Revels script so no game could run. It is gone, along with the petal game it belonged to.
2. **Petal game removed completely.** `startPetals`, `endPetals`, `spawnPetal`, `petalLoop`, `drawPetalShape`, `drawRockShape`, `drawIdle`, `updatePetalHUD`, `pickRockGap`, `roundFactor`, `pburst`, `drawSky`, `drawGrass`, `drawPetalHearts`, the `PLEVELS`/`pst` block and its `getElementById('game')` canvas lookup are all deleted (verified by grep — none remain). The old `showCrossy()` that opened the petal game now opens Crossy Cat.
3. **Falling-petals background kept on every page.** The main script's petal-canvas animation (used on page transitions) is in shared `site.js`, and every page — including games/music/photos — includes the canvas and runs the petals on load. (Note: the background's own helper is named `spawnPetals`, plural — that is the decoration, not the removed game.)
4. **Dead legacy Crossy markup removed** from the main document (its buttons called `crossyStart()`/`crossyMove()`, which never existed in main scope). The markup itself was moved into the Games page and wired to the real game.
5. **Trivia and Jumpy Kitty run again.** They were blocked only by the parse error; both were exercised end-to-end in testing (below).

## Crossy Cat — built (it never existed beyond the cat picker)

- **Play:** 480×640 canvas, 6×8 grid. Pick one of the 4 cats (all four appear equally in the picker; the player chooses), then hop with Left / Jump / Right buttons, arrow keys, or by tapping the canvas. The cat hops cell to cell across flower meadows, with safe meadow rows between hazard lanes. Reaching the water row at the top wins (+100, end screen with Play Again → back to the picker). Best score persists in `localStorage` (`crossyBest`).
- **Hazards:** carriages, horses and dogs move across the lanes at different speeds (dogs fastest), speeding up slightly the longer a run lasts. A hit costs a life and returns the cat to the garden; at zero lives the run ends. Golden-flower power-ups appear on the field — stepping on one shields the cat (a shield absorbs one hit).
- **Special powers** (adapted from the existing `CATS` abilities):
  - **Tesla** — *Yarn Spell:* the Power button clears every hazard on screen, once per run.
  - **O'Malley** — *extra life:* starts with 4 lives instead of 3 (passive, as in `CATS`).
  - **Kableton** — *power-ups last twice as long:* golden-flower shield lasts 10 s instead of 5 s.
  - **Berlioz** — *moves faster:* hop cooldown 0.11 s instead of 0.17 s.
- **Crown identification:** I inspected the four extracted cat portraits. The gray cat with the **purple collar is Tesla** (`cat-tesla.png` — silver-gray tabby, purple collar; matches the Trivia answers too: Tesla purple, Berlioz blue, O'Malley yellow, Kableton green). So **Tesla alone wears a crown in Crossy Cat, and it is drawn purple**; the other three cats are drawn exactly from their pictures with no crown.

## Testing

- **Syntax:** `node --check` passes for `assets/js/site.js` and `assets/js/games.js`, and for every inline `<script>` block in the four pages.
- **Runtime smoke test** (Node with a DOM stub, driving the real pages/scripts): Trivia starts, renders questions, scores a correct answer and advances; Jumpy Kitty starts, runs frames, flaps and ends with a result; Crossy Cat picker shows 4 cats, game starts, Tesla's Yarn Spell fires and disables, the cat climbs 7 jumps to the water and wins (score/best 100, best persisted), and Play Again returns to the picker. `site.js` also loads cleanly against the home and music pages.
- **HTTP crawl:** served `site/` with `python3 -m http.server` and fetched every page plus every referenced local asset — **38 of 42 URLs return 200; the only 404s are the 4 known missing files listed below. No other broken links.**
- **Greps:** no `data:` URIs, no `stopPetals` pattern, no petal-game functions, no `getElementById('game')` anywhere in the output.

## ⚠️ Files Michael still needs to upload (not in the original — do not invent)

These were referenced by the original file but never embedded in it, so they are kept as plain relative references. Upload all four **next to the top-level `index.html`** (the site root) — the Music and Photos pages already point there (`../`):

1. `friend-like-me.mp3` — the "Magic in the Corner" song (first Melodies button)
2. `cant-wait-king.mp3` — "Crown Ambition"
3. `everybody-cat.mp3` — "The Feline Creed"
4. `toby.jpg` — Toby's photo in the Gallery

Until they are uploaded, those three song buttons and Toby's gallery card will simply not load their media; everything else works.

## Notes

- Small honesty note, same as the original: the Melodies page in the source file only ever had player cards for the first four tracks; the `royal-4/5/6` audio elements are present in the Music page exactly as in the original (looping elements with no separate card), unchanged.
- Build scripts are kept in `work/` (`build.py`, `crossy.js`) so the site can be regenerated from the original file if Michael wants changes.
- Nothing was uploaded or sent anywhere — local files only.
