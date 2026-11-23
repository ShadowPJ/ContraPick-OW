# DECISION_LOG — Contrapick (CPOW-2)

## 2026-11-23 — Hero library as separate page (D-001)
Context: Principal wants a "library" of all heroes with abilities.
Options considered: (a) tab inside index.html — single file, instant; (b) separate biblioteca.html — isolated page, linked from header.
Decision: (b) separate `biblioteca.html`, sharing a common `styles.css`; picks on index.html link to `biblioteca.html#<id>`.
Rationale: Principal's choice.
Consequences: Extract shared CSS to avoid duplication; both pages published in the same artifact via `files`.
Approver: Principal (approved 2026-11-23)
Drafted by: Manager

## 2026-11-23 — Local optimised WebP portraits (D-002)
Context: Pages need hero images while staying fast.
Options considered: (a) local WebP copies; (b) hotlink official CDN.
Decision: (a) download official portraits once, convert to 128px WebP, publish with the artifact.
Rationale: Fastest, no external dependency, no breakage on CDN changes.
Consequences: ~54 image files in `img/`; fallback to initials badge if missing. Fan-project disclaimer stays in footer.
Approver: Principal (approved 2026-11-23)
Drafted by: Manager

## 2026-11-23 — Security review of v2 pages (S-review-1)
Context: WS-5 pre-publish check.
Decision: Security verdict APPROVE-WITH-CONDITIONS. No Sev-1..3. Conditions: (1) Security re-scans abilities.json before bundling; (2) recommended fixes S-01 (prototype-key lookup), S-02 (guard untrusted abilities shape), S-04 (whitelist localStorage fields). S-03 (URL host label), S-06 (exclude img/manifest.json from publish) to be applied. S-05 (Google Fonts IP leak) accepted as residual risk for a no-PII prototype tool.
Approver: Manager (within approved scope; residual S-05 to be reported to Principal)
Drafted by: Manager

## 2026-11-23 — Self-hosted, Overwatch-like fonts (D-003)
Context: Security S-05 (Google Fonts leaks IP); Principal chose to bundle fonts and asked for typefaces resembling Overwatch.
Decision: Drop Google Fonts; ship woff2 files in `fonts/` with @font-face in styles.css. Only redistributable (OFL/Apache) fonts; Blizzard's proprietary fonts (Koverwatch, Futura) and freeware-with-unclear-licence fonts (BigNoodleTitling) excluded.
Consequences: Resolves S-05. Researcher selects + downloads; Frontend wires @font-face after the current fix round.
Approver: Principal (approved 2026-11-23)
Drafted by: Manager

## 2026-11-23 — Security final sign-off (S-review-2)
Decision: Security APPROVE for abilities.json + self-hosted fonts; S-05 resolved (D-003). D-1 placeholders fixed by Manager (`<id>` → `{slug}` in sources). S-06: img/manifest.json excluded from publish. S-04 to be confirmed by Tester/Revisor re-review.
Data caveats surfaced in UI: mauga, freja verified:false; 25 heroes keysVerified:false → key letters hidden (Manager decision, conservative).
Approver: Manager (within approved scope)

## 2026-11-23 — Close-out: Contrapick v2 published (Version 3)
Context: All workstreams WS-1..WS-5 complete.
Evidence: Tester gate PASS — AC-1..AC-6, S-04, fonts (engine regression: 64 configurations, 0 diffs vs baseline). Revisor: all round-1 items resolved; final light --tank token fixed (Manager re-measured contrast with the WCAG formula: Frontend's values correct). Security: APPROVE (no open findings; S-05 resolved by D-003; S-06 honoured — img/manifest.json and fonts/fonts.css.txt not published; OFL licences shipped).
Residuals (non-blocking, backlog): duplicate ids from tampered localStorage (pre-existing); initial-render CLS from fetch-driven content (index 0.48, library 0.30 mobile); library search ranks hero-name matches after ability matches; mauga/freja verified:false; 25 heroes keysVerified:false (keys hidden).
Published: https://claude.ai/artifact/LMx24Reh6Hq5XEUZENHGWm (Version 3, 2026-11-23)
Drafted by: Manager

## 2026-11-23 — Visual redesign: modern + notable Overwatch touch (D-004)
Context: Principal requested a modern aesthetic with a clearly noticeable Overwatch flavour, delegated to Frontend using the ui-ux-pro-max skill.
Decision: Frontend generates a design system (ui-ux-pro-max --design-system, persisted to design-system/) and restyles index.html + biblioteca.html. Constraints: CSS-only (no animation libs), engine/data untouched, keep AA contrast, dark+light, 375px, no Blizzard logos/wordmarks (fan project, avoid impersonation); OW cues via colour (orange/white/steel blue), skewed/angled shapes, chevrons, HUD details.
Gate: Revisor + Tester (AC-1..AC-6 + engine regression) before republish.
Approver: Principal (requested 2026-11-23)
Drafted by: Manager

## 2026-11-23 — D-004 status (session paused: usage limit)
Tester final re-gate: PASS (AC-1..AC-6, engine 64 configs 0 diffs, CLS max 0.0069, Firefox OK). Residual non-blocking: 3 library details overflow at 320px (reinhardt, lifeweaver, widowmaker); load() dedupe (pre-existing).
Pending before publish: Revisor re-review of the D-004 fix round (last verdict CHANGES_REQUESTED; fixes applied, not yet re-reviewed). NOT published yet — live is still Version 3.
Publish exclusions: design-system/, img/manifest.json, fonts/fonts.css.txt.

## 2026-11-23 — D-004 published (Version 4)
Revisor: APPROVED (D-004 fix round). Tester: final re-gate PASS. 320px library-detail overflow fixed (wrap rule, verified 320/360/375/1280 both themes); --f-mono removed.
Published: https://claude.ai/artifact/LMx24Reh6Hq5XEUZENHGWm (Version 4). Excluded: design-system/, img/manifest.json, fonts/fonts.css.txt (verified in file listing).
Backlog (low): load() dedupe of tampered stored ids; skeleton tiles instead of measured min-heights; keys for 25 heroes with keysVerified:false.
Drafted by: Manager
