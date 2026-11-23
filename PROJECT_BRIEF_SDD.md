# PROJECT_BRIEF_SDD — Contrapick v2 (CPOW-2)

Status: APPROVED by Principal 2026-11-23 (library = separate page biblioteca.html; images = local WebP)
Owner: Manager · Date: 2026-11-23
Live artifact: https://claude.ai/artifact/LMx24Reh6Hq5XEUZENHGWm

## 1. Problem
Contrapick (index.html + heroes.json, 54 heroes, Season 5) works but heroes are shown as initials badges,
there is no way to look up what a hero does, and the layout is functional rather than polished.

## 2. Outcomes
- O-01 Every hero shows its official portrait (roster, slots, picks, avoid chips).
- O-02 A "Biblioteca" view lists all 54 heroes with role, passive, abilities and ultimate (Spanish).
- O-03 Page stays fast: first render of roster with images ≤ 1.5 s on a cold load; total image weight ≤ 1.5 MB.
- O-04 Visual polish: clearer hierarchy, consistent spacing, role colours, keeps dark/light themes and mobile layout.
- O-05 No regression in the counter engine (same scores for the same input).

## 3. Decisions (Manager-owned, §4)
| Decision | Value | Why |
|---|---|---|
| API type | None (static site, JSON data files) | No server needed |
| Tier | Prototype / personal fan tool | Public-read, no PII, no auth |
| Approval batching | One proposal | Tightly coupled changes |
| Status cadence | At end of each phase | Short project |

## 4. Scope
In: portraits (local, optimised WebP), `abilities` data per hero, separate `biblioteca.html` library page (search + role filter + hero detail, deep-link `biblioteca.html#<id>`) sharing `styles.css` with index.html,
UI polish, republish to same artifact URL.
Out: new counter logic, accounts/backends, hero-stat scraping beyond kits, automatic patch updates.

## 5. Workstreams & owners
| WS | Owner | Deliverable |
|---|---|---|
| WS-1 Ability data (54 heroes, S5 kits, ES) | researcher | `abilities.json` with sources |
| WS-2 Portraits | scrapling | `img/<id>.webp` (≤ 25 KB each, 128px) + source manifest |
| WS-3 UI: images + library + polish | frontend | updated `index.html` |
| WS-4 Review | revisor + tester | findings; engine regression check |
| WS-5 Third-party content check | ciberseguridad | quick sign-off (no external scripts, safe rendering of data) |

## 6. Acceptance criteria
- AC-1 54/54 heroes have an image; missing image falls back to the current initials badge.
- AC-2 54/54 heroes have passive (if any), ≥ 3 abilities and an ultimate, in Spanish.
- AC-3 Library filterable by role and searchable by hero or ability name.
- AC-4 Images lazy-loaded with explicit width/height (no layout shift).
- AC-5 Engine output identical before/after for 3 reference compositions.
- AC-6 Works at 375 px width without horizontal scroll; dark and light themes.
