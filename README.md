# vdl-orgdev

The OrgDev system for **Quinta Vale da Lama, Lda.** — a Holacracy-derived governance implementation.
Notion holds the structure; this repo holds everything else.

**Live org map:** https://ludwa6.github.io/vdl-orgdev/

> Renamed from `vdl-orgmap` on 2026-08-15, when this repo became the single home for OrgDev code and
> documentation. The old URL redirects.

---

## The one rule

> **Every file is either *written* or *generated*. Generated files live under a `generated/` path and
> carry a do-not-edit header. Nothing is both.**

Drift in this project has always come from the same place: a hand-written document describing a live
system. The schema documentation was wrong in four places within six months of being written, which
is why it is now generated rather than maintained.

## Layout

| Path | What | Written or generated |
|---|---|---|
| `index.html` | The org map — the staff-facing surface | written |
| `graph.json` | The org graph, from Notion. **Git history is the structural audit trail** | **generated** |
| `docs/` | SOP, admin guide, backlog, schema context | written |
| `docs/generated/` | Live Notion schema | **generated** |
| `scripts/` | Build scripts and the validator | written |
| `handbook/` | `.md` / `.docx` exports of the governance handbook (Tier 2 audit trail) | exported |
| `archive/` | Superseded material, kept for history — **not reference** | frozen |

## The three tiers

| Tier | Content | Changes | Home |
|---|---|---|---|
| 1 — Constitution | Holacracy v5.0 + the Register of Adopted Variations | almost never | the Constitution |
| 2 — Narrative | Purpose, Values, how we work, glossary | rarely, by a human | the handbook |
| 3 — **Structure** | Circles, Roles, Domains, Accountabilities, Policies, assignments | **every Governance Meeting** | **Notion** |

Tier 3 is the fast-moving layer and the only one with a machine-readable home. The map and the
enumerated sections of the handbook are both generated from it.

## Credentials

`NOTION_API_KEY` lives in **GitHub Actions secrets only** — never in this repo, never in the browser.
This repo is public and generates its data from a credentialled source; all access goes through
`process.env` in the build scripts.

## Status — 2026-08-15

- `scripts/replit-proxy-DEPRECATED/` is the Express proxy currently serving the map from Replit.
  It is being replaced by a scheduled GitHub Action that commits `graph.json`. **It stays until the
  Action is proven against its output** — 23 nodes / 26 edges as of 2026-08-14.
- `docs/schema-current.md` is still the hand-written February version. It is superseded by
  `docs/generated/schema.md` as soon as `build-schema.mjs` exists.
