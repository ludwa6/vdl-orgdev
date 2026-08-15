# OrgDev User Stories Backlog

**Created:** 2026-02-08
**Source:** Walt's data admin experience during Phase A cleanup
**Status:** Draft for review and prioritization

---

## Epic 1: Schema Maturity — "The data model should fully express Holacracy"

### US-1.1: Circle Accountabilities
**As a** Circle Lead reviewing my circle's governance,
**I want to** see all Accountabilities that belong to my circle (both circle-level and via roles),
**So that** I can verify our governance is complete.

**Context:** In Holacracy v5, a Circle is a Role that has been expanded. It should carry the same tripartite definition: Purpose + Domains + Accountabilities. Currently, Circles have Purpose (text) and Domains (relation), but NO Accountabilities relation. Accountabilities exist in the Accountabilities DB linked to individual Roles, but there's no way to see them aggregated at the Circle level.

**Options to evaluate:**
- (a) Add "Accountabilities" relation to Circles DB (direct link, like Domains)
- (b) Add a rollup on Circles that gathers Accountabilities through Roles → Accountabilities
- (c) Build a Circle dashboard view that aggregates via filtered views

**Acceptance criteria:**
- [ ] From any Circle record, I can see all associated Accountabilities
- [ ] The relationship between Circle-level and Role-level accountabilities is clear
- [ ] Consistent with Holacracy v5 constitution

---

### US-1.2: Circle-as-Role Conceptual Alignment
**As a** Holacracy practitioner,
**I want** the data model to reflect that a Circle IS a Role (expanded),
**So that** the system enforces the constitution rather than fighting it.

**Context:** Currently Circles and Roles are separate databases. This is probably correct for implementation (they have different properties), but the conceptual link needs to be explicit. A Circle should have everything a Role has (Purpose, Domains, Accountabilities) plus additional Circle-specific properties (Members, Sub-circles, Core Roles).

**Acceptance criteria:**
- [ ] Circles have Purpose ✅ (already exists)
- [ ] Circles have Domains ✅ (already exists)
- [ ] Circles have Accountabilities (see US-1.1)
- [ ] Documentation clearly states the Circle-as-Role principle

---

### US-1.3: Legacy Field Cleanup
**As a** data admin,
**I want** obsolete fields removed or hidden,
**So that** I don't accidentally use the wrong field or confuse new users.

**Fields to address:**
- [ ] Roles: "Status (Legacy)" — hide from all views, delete after validation
- [ ] Roles: "People" relation — keep during transition, then remove
- [ ] People: "Roles" relation — paired with above
- [ ] People: "Status 1" formula — update to reference "Role Status" instead of "Status (Legacy)"

**Depends on:** Proxy code no longer referencing legacy fields

---

## Epic 2: Data Admin Tooling — "Make it hard to break things"

### US-2.1: Standard Operating Procedure for Data Entry
**As a** data admin (Walt, and eventually Nita),
**I want** a documented step-by-step procedure for common operations,
**So that** I don't miss steps or create orphaned/inconsistent records.

**Operations to document:**
1. **Onboard a new Person** — Create Person → Set fields → Add to Circle Memberships → Assign to Roles via "Energized By"
2. **Create a new Role** — Create Role → Set Name, Purpose, Role Type, Circle → Link Accountabilities → Link Domains → Assign person
3. **Create a new Circle** — Create Circle → Set Name, Purpose, Status, Super-circle → Create core roles (Lead, Rep, Secretary, Facilitator) → Link core roles to Circle fields → Add members
4. **Reassign a Role** — Open Role record → Remove old person from "Energized By" → Add new person → Update Assignment Date
5. **Offboard a Person** — Remove from all Energizes Roles → Remove Circle Memberships → Set Person Status = Former → Set End Date
6. **Restructure Circles** — (complex, needs its own sub-procedure)

**Format:** Checklist-style, suitable for Notion template or printed reference card.

**Acceptance criteria:**
- [ ] Each operation has numbered steps with expected cascade effects noted
- [ ] UX traps are called out with warnings (the table-view deletion trap)
- [ ] Procedure recommends "Open record first" for all relation edits

---

### US-2.2: API-Based Data Admin Commands
**As a** data admin,
**I want to** make common changes by asking Claude via chat,
**So that** I avoid Notion's dangerous table-view UX entirely for relation changes.

**Example interactions:**
- "Assign Charlotte to the Marketing role"
- "Remove Anna from all roles and mark her as Former"
- "Create a new Defined Role called 'Volunteer Coordinator' in the Activities circle"

**Acceptance criteria:**
- [ ] Claude can perform assign/unassign/create operations via Notion API
- [ ] Each operation follows the SOP (US-2.1) including all cascade steps
- [ ] Confirmation shown before destructive changes

**Note:** This is essentially what we've been doing ad-hoc. The user story is about making it *reliable and repeatable* — potentially via a custom MCP tool or documented prompts.

---

### US-2.3: Data Integrity Validation Script
**As a** data admin,
**I want to** run a validation check that finds inconsistencies,
**So that** I can catch problems before they compound.

**Checks to implement:**
- [ ] Every Person with Energizes Roles should also be in Circle Memberships for those roles' circles
- [ ] Every Circle with a Circle Lead relation should point to a Role with Role Type = "Circle Lead"
- [ ] Every Role with "Energized By" populated should have Role Status = "Active"
- [ ] Every Role with Circle field populated should point to an existing, non-trashed Circle
- [ ] No orphaned People (no roles, no circle memberships, status still "Active")
- [ ] Every Circle has all 4 core role slots filled (Lead, Rep, Secretary, Facilitator)
- [ ] Legacy "People"/"Roles" fields should match "Energized By"/"Energizes Roles" (during transition)

**Output:** Report listing all inconsistencies with suggested fixes.

**This IS a form of testing** (see US-3.2) — but focused on data integrity rather than code correctness.

---

## Epic 3: Code-Docs Sync — "Documentation should never be stale"

### US-3.1: Schema Documentation as Code
**As a** developer (Walt + Claude),
**I want** schema documentation generated FROM the live Notion schema,
**So that** docs are always accurate and never manually maintained.

**Approach:**
- Script that queries all 6 database schemas via Notion API
- Generates a markdown file with all properties, types, relations, formulas
- Compares to last generated version and highlights changes
- Stored in `claude-workspace/context/` and auto-committed to GitHub

**This replaces:** OrgDev_Schema_Documentation_v2_Final.docx (already obsolete)

**Acceptance criteria:**
- [ ] Running the script produces accurate, current schema docs
- [ ] Output includes relation direction, formula expressions, select options
- [ ] Diff from previous version is shown
- [ ] Can be run at start of any Claude session to ensure current context

---

### US-3.2: Test-Driven Development for Proxy
**As a** developer,
**I want** automated tests for the OrgMap proxy,
**So that** schema changes don't silently break the visualization.

**Context:** TDD is absolutely the right instinct here. The proxy is the most fragile component — it reads specific Notion field names and transforms them into a D3 visualization format. When we renamed "Roles (Do Not Use)" to "Energizes Roles", the proxy broke silently until the OrgMap showed disconnected nodes.

**What to test:**
- [ ] Proxy correctly reads "Energizes Roles" (not legacy field name)
- [ ] Lead edge detection: person energizes a circleLead role → "leads" edge appears
- [ ] Rep edge detection: same for circleRep
- [ ] Member edge detection: person in Circle Members → "energizes" edge
- [ ] Missing data handling: role with no "Energized By" doesn't crash
- [ ] Circle hierarchy: sub-circles correctly nested under super-circles

**Technology:** Jest or Vitest for the proxy (Node.js). Mock Notion responses for fast, reliable tests.

**Acceptance criteria:**
- [ ] Tests run in CI (GitHub Actions) on every push
- [ ] Test failures block deployment
- [ ] Tests use mock data, not live Notion (deterministic)

---

### US-3.3: Issue Tracking for User-Reported Bugs
**As a** user (Nita, or any future user of the OrgMap/dashboard),
**I want** a way to report problems I encounter,
**So that** issues get tracked and fixed rather than forgotten.

**Options:**
- (a) GitHub Issues on the orgmap-proxy repo (natural for dev, less so for non-dev users)
- (b) Notion database in the OrgDev workspace (accessible to Notion users)
- (c) Simple form/email that creates GitHub issues (bridge approach)

**Acceptance criteria:**
- [ ] Non-technical users can report issues without GitHub knowledge
- [ ] Issues are tracked with status (Open, In Progress, Done)
- [ ] Each issue captures: what happened, what was expected, which page/view

---

## Epic 4: Missing Content — "Data we were given but hasn't landed"

### US-4.1: Verify Restaurant Sub-Circle Content
**As a** data admin,
**I want to** verify that all content from the original Casa Ops Google Doc migration is complete and correctly linked,
**So that** I know the migration is done.

**What was migrated (Feb 6-7):**
- 4 sub-circles created (Restaurant, B&B, Activities, Groups & Retreats) ✅
- ~12 roles created with core roles for each sub-circle ✅
- ~21 accountabilities created and linked to roles ✅
- ~25 domains created ✅
- ~18 policies created ✅

**What may be missing or unlinked:**
- [ ] Accountabilities visible from Circle level (see US-1.1)
- [ ] Domains linked to Circles (currently linked to Roles — should they also be on Circles?)
- [ ] All core roles (Lead, Rep, Secretary, Facilitator) linked to their Circle's structural fields
- [ ] People assigned to energize roles (partially done during today's cleanup)

**Action:** Run validation script (US-2.3) against migrated data to find gaps.

---

## Prioritization Suggestion

| Priority | Story | Rationale |
|----------|-------|-----------|
| **P0 — Do now** | US-2.1 (SOP) | Prevents data corruption during ongoing manual work |
| **P0 — Do now** | US-1.1 (Circle Accountabilities) | Architectural decision needed before more content entry |
| **P1 — This week** | US-3.1 (Schema as Code) | Eliminates stale docs problem permanently |
| **P1 — This week** | US-2.3 (Validation Script) | Catches existing inconsistencies |
| **P1 — This week** | US-4.1 (Verify Migration) | Confirms existing data is correct |
| **P2 — Next sprint** | US-3.2 (TDD for Proxy) | Prevents future regressions |
| **P2 — Next sprint** | US-1.3 (Legacy Cleanup) | Depends on proxy tests existing |
| **P3 — Backlog** | US-2.2 (API Admin Commands) | Nice-to-have, currently done ad-hoc |
| **P3 — Backlog** | US-3.3 (Issue Tracking) | Needed before wider rollout |
| **P3 — Backlog** | US-1.2 (Circle-as-Role) | Conceptual documentation, low urgency |

---

*This backlog should be reviewed and re-prioritized by Walt based on what's blocking his and Nita's work.*
