# Photographs — what is real, what is a placeholder, and what is still missing

Every image on the site falls into one of three buckets. **Anything marked
PLACEHOLDER is not School #37** and should be swapped for a real photograph of the
school when one is available.

---

## 1. Genuine School #37 photographs

These appear to be real photographs of the school and its people. Nothing needs
doing unless you know otherwise.

| File | Used for | Notes |
|---|---|---|
| `hero-school.jpg` | Homepage hero | Resized 4096×1792 → 2048×896, 8.8 MB → 221 KB |
| `principal.jpg` | Akramova Zamira (about, contact) | Named photo, kept |
| `natasha.jpg` | Ugryumova Natalya (about, contact) | Named photo, kept |
| `khushnud.jpg` | Khushnud Ochilov testimonial | Named photo, kept |
| `edgar.jpg` | Kasimov Edgar testimonial | Named photo, kept. Small source (274×307) — a larger original would look better |
| `graduation.jpg` | University admissions cards | Kept |
| `students-achievement.jpg` | FLEX finalists cards | Kept |
| `sports.jpg` | Chess Champions, Sports Facilities | Kept — see gap #2 below |
| `library-modern.jpg` | Library & Resource Center | Kept |
| `library.jpg` | Mathematical Excellence card | Kept |
| `classroom.jpg` | Modern Classrooms, IELTS card | Kept — see gap #1 below |

## 2. Sample photographs added as placeholders

Freely-licensed stand-ins so no slot shows a broken or obviously wrong image.
**None of these are School #37.** Replace them with real school photographs.

| File | Used for | Source | Author | Licence |
|---|---|---|---|---|
| `science-lab.jpg` | Science Laboratories (about), Science Olympiad (achievements) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Science_Lab_at_Regent%27s_International_School_Bangkok.jpg) | TheRegentsInternationalSchoolBangkok | **CC BY-SA 4.0** |
| `art-studio.jpg` | Arts & Music Studios (about), Art Competition Winners (achievements) | [rawpixel](https://www.rawpixel.com/image/9647479/photo-image-arts-public-domain-painting) | rawpixel | CC0 1.0 |
| `music-room.jpg` | Music Excellence (achievements) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Music_Addition_Classroom.jpg) | MatthewBA08 | CC0 1.0 |
| `basketball.jpg` | Basketball Excellence (achievements) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hamersley_indoor_basketball_court_2.jpg) | Orderinchaos | **CC BY-SA 4.0** |

> **Attribution obligation:** `science-lab.jpg` and `basketball.jpg` are CC BY-SA 4.0.
> Keeping this file in the repository satisfies the credit requirement, but if you
> remove it, the credit must appear somewhere on the site. The CC0 files need no credit.
> Replacing these with the school's own photographs removes the obligation entirely.

### Placeholder avatars

Four people were shown with photographs of someone else. Rather than substitute
another stranger's face, they now use neutral initial-based SVGs:

| File | Person | Why |
|---|---|---|
| `avatars/umeda-sharipova.svg` | Sharipova Umeda, Head Teacher | Was `teacher-male.jpg` — a stock photo of a man, on both about and contact |
| `avatars/sabrina-bakhronbekova.svg` | Sabrina Bakhronbekova | Was a group photo shared with another student |
| `avatars/oybek-jurabaev.svg` | Oybek Jurabaev | Was the same group photo |
| `avatars/nigina-mukhsinova.svg` | Mukhsinova Nigina, Counsellor | Generated but **not yet applied** — she still uses `teacher-female.jpg`, which is also generic stock. Swap it in if you'd rather show initials than a stranger |

## 3. Photographs still missing

What to shoot, in rough priority order:

1. **A sharp classroom photograph.** `classroom.jpg` is only 445×364 and is
   stretched across the full width of the about page, so it looks soft. It is used
   in three places. A single good wide shot of a classroom in use fixes all of them.
   (A sharp CC0 alternative sits unused at `resources/sample/classroom-alt.jpg` — a
   post-Soviet classroom with a Cyrillic alphabet chart — but it is empty and
   plant-heavy, so it undersells "Modern Classrooms". Your own photo will be better.)
2. **Chess.** `sports.jpg` currently covers both Chess Champions and the sports
   facilities panel. A photo of the chess club would remove the duplication.
3. **Real photographs of the four staff members and the two students above**, with
   their permission. This is the only way to remove the placeholder avatars honestly.
4. **Science lab, art room, music room, sports hall — the school's own.** The four
   sample photos above are stand-ins for rooms the school presumably has.
5. **A larger original of Kasimov Edgar's photo** — the current one is 274×307 and
   is displayed at 80px, so it is adequate but has no headroom.

### Rejected samples — do not use

Three downloaded candidates were deliberately **not** used. They sit in
`resources/sample/` on the machine that ran this pass (that folder is git-ignored,
so it is not published), recorded here so the decision is reviewable:

- **`school-building.jpg`** — a real Uzbek specialised school, but it is the
  *Ibrayim Yusupov Boarding School in Nukus*, with its name on the facade and a
  bust of Yusupov outside. Publishing it as School #37 would misrepresent another
  named institution.
- **`chess.jpg`** — an outdoor chess tournament in Tyumen, Russia. Children's faces
  are clearly identifiable in the foreground, and the card text would present them
  as School #37 pupils.
- **`classroom.jpg`** (the sample, not the site one) — a French classroom covered in
  French signage, with an identifiable masked teacher.

---

## Facts that need someone from the school to settle

Not photographs, but flagged during the same pass. Each of these contradicts
itself somewhere on the site:

| Item | The conflict |
|---|---|
| Ugryumova Natalya's phone | about.html says `+998 (90) 505-51-38`; contact.html says `+998 (95) 558-23-48`. A `TODO` marks the spot in about.html |
| Staff email domain | about.html used `@school-37.com`, contact.html used `@mail.ru` for the same people. **Everything was normalised to the `@mail.ru` form** — revert if the `.com` addresses are the live ones |
| Graduate count | "89 graduates accepted", but the admissions pie chart totals 77 (46+6+8+6+4+3+2+1+1) |
| IELTS figures | The stat card says 26 students achieved a high IELTS; the distribution chart sums to 46 (5+12+18+8+3) |
| FLEX finalists | The stat card says "2025 & 2026"; the matching achievement card is dated "2023-2024" |
| Progression chart | Runs 2020–2024 and tops out at 52 graduates, while 2025 is given elsewhere as 89 |
| Map location | The Leaflet marker sits at generic Samarkand coordinates (39.6542, 66.9597), not at Makhmud Koshgari 61 |
