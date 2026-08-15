# HolaFlow Schema Documentation — Auto-Generated

**Generated:** 2026-02-22T00:00:00Z  
**Generator:** Claude (Sonnet 4.6) via Notion MCP  
**Source:** Live Notion API

> ⚠️ **This file is auto-generated.** Do not edit manually. Regenerate by asking Claude to query all database schemas and update this file.

---

## What's New (Feb 22)

**Tensions database added to schema docs:**
- Tensions DB existed since 2026-01-04 but was omitted from Feb-10 auto-gen run
- This caused "no Tensions database" error during 2026-02-21 session
- Now documented with full property list, IDs, and relations

**Roles Row Count property ID resolved:**
- Was `(TBD)` in previous version — now confirmed as `w]pd` (verified live)

---

## What's New (Feb 10)

**Row Count field added to all databases:**
- Added by Notion AI agent to enable database-level record counting
- Formula type: returns `1` for each row, aggregated via SUM for total count
- Property ID varies per database (see below)
- Hidden in most views but available for reporting/auditing

**Also Added (observed):**
- Accountability Count (rollup on Circles)
- Domain Count (rollup on Circles)
- Policy Count (rollup on Circles)

---

## Database IDs Quick Reference

| Database | REST API (database_id) | MCP (data_source_id) |
|----------|------------------------|----------------------|
| Circles | `2de36f74-3758-81bf-83c8-c9c69b114bc4` | `2de36f74-3758-8122-ac4a-000b520202bf` |
| Roles | `2de36f74-3758-8138-b40c-d2bbdb243419` | `2de36f74-3758-8123-8fda-000b5d5af434` |
| People | `b981cd95-342b-4eb5-afa8-f38ac85c6c15` | `c2edc051-62cd-49cb-9805-38fa64d83a4f` |
| Accountabilities | `2eb36f74-3758-809a-9745-f040cb48a5fe` | `2eb36f74-3758-8086-8cc9-000bb45bfa91` |
| Domains | `2eb36f74-3758-80a6-aa0e-f54f72dc24f3` | `2eb36f74-3758-80b9-a49d-000b3a7a87ef` |
| Policies | `2de36f74-3758-8128-a650-ef7069aa6bd7` | `2de36f74-3758-8118-8a20-000b3d60d38e` |
| Tensions | `2de36f74-3758-8129-b052-f8ad10f18340` | `2de36f74-3758-816e-a143-000b7905cce8` |

---

## Circles

**Database ID (REST):** `2de36f74-3758-81bf-83c8-c9c69b114bc4`  
**Database ID (MCP):** `2de36f74-3758-8122-ac4a-000b520202bf`  
**Title:** Circles  
**Last Edited:** 2026-02-10

### Properties

| Property Name | Property ID | Type | Details |
|--------------|-------------|------|---------|
| Name | `title` | title | Title (text) |
| Purpose | `rJQt` | rich_text | Rich Text |
| Status | `g>f[` | select | Select (2 options: Active, Inactive) |
| Level | `L?F;` | number | Number |
| Notes | `QC\`u` | rich_text | Rich Text |
| Created Date | `=ggf` | created_time | Created Time (auto) |
| Last Updated | `XwP^` | last_edited_time | Last Edited Time (auto) |
| **Row Count** | `MSLo` | formula | Formula: returns 1 per row |
| Accountability Count | `MlE=` | rollup | Counts from Accountabilities relation |
| Domain Count | `mt\|v` | rollup | Counts from Domains relation |
| Policy Count | `puqH` | rollup | Counts from Affecting Policies relation |
| Super-circle | `;gpx` | relation | Relation → Circles (bidirectional ↔) |
| Sub-circles | `bMJf` | relation | Relation → Circles (bidirectional ↔) |
| Circle Lead | `t\`=m` | relation | Relation → Roles (unidirectional →) |
| Circle Rep | `f^t<` | relation | Relation → Roles (unidirectional →) |
| Secretary | `?JGF` | relation | Relation → Roles (unidirectional →) |
| Facilitator | `px~n` | relation | Relation → Roles (unidirectional →) |
| Circle Members | `qcFg` | relation | Relation → People (bidirectional ↔) |
| People (Primary Circle) | `fowf` | relation | Relation → People (bidirectional ↔) |
| Domains | `}j?K` | relation | Relation → Domains (bidirectional ↔) |
| Accountabilities | `HIsX` | relation | Relation → Accountabilities (bidirectional ↔) |
| Dependent Accountabilities | `eijU` | relation | Relation → Accountabilities (bidirectional ↔) |
| Affecting Policies | `:SXJ` | relation | Relation → Policies (bidirectional ↔) |

### Relations Summary

- **Super-circle** ↔ Circles.**Sub-circles** (self-referential, bidirectional)
- **Circle Lead** → Roles (unidirectional)
- **Circle Rep** → Roles (unidirectional)
- **Secretary** → Roles (unidirectional)
- **Facilitator** → Roles (unidirectional)
- **Circle Members** ↔ People.**Circle Memberships** (bidirectional)
- **People (Primary Circle)** ↔ People.**Primary Circle** (bidirectional)
- **Domains** ↔ Domains.**Shared With** (bidirectional)
- **Accountabilities** ↔ Accountabilities.**Owning Circle** (bidirectional) ⭐
- **Dependent Accountabilities** ↔ Accountabilities.**Dependencies** (bidirectional)
- **Affecting Policies** ↔ Policies.**Affects** (bidirectional)

### Rollups

**Accountability Count:**
- Rolls up from: `Accountabilities` → (counts)
- Purpose: Shows how many accountabilities are owned by this circle

**Domain Count:**
- Rolls up from: `Domains` → (counts)
- Purpose: Shows how many domains are shared with or controlled by this circle

**Policy Count:**
- Rolls up from: `Affecting Policies` → (counts)
- Purpose: Shows how many policies affect this circle

### Key Design Notes

- **Circle Lead/Rep/Secretary/Facilitator** point to **Role records**, not People
- **Accountabilities** relation was added 2026-02-08 to implement Circle-as-Role model
- **Owning Circle** is the canonical source of truth for accountability ownership
- **Row Count** field (added 2026-02-10) enables database-level aggregation

---

## Roles

**Database ID (REST):** `2de36f74-3758-8138-b40c-d2bbdb243419`  
**Database ID (MCP):** `2de36f74-3758-8123-8fda-000b5d5af434`  
**Title:** Roles  
**Last Edited:** 2026-02-10

### Properties

| Property Name | Property ID | Type | Details |
|--------------|-------------|------|---------|
| Name | `title` | title | Title (text) |
| Purpose | `` `@VX `` | rich_text | Rich Text |
| Role Type | `suoy` | select | Select (5 options: Defined Role, Secretary, Facilitator, Circle Rep, Circle Lead) |
| Notes | `C\\hd` | rich_text | Rich Text |
| Assignment Date | `f[Ki` | date | Date |
| Created Date | `nX>c` | created_time | Created Time (auto) |
| Last Updated | `zOSD` | last_edited_time | Last Edited Time (auto) |
| **Row Count** | `w]pd` | formula | Formula: returns 1 per row |
| Circle | `xSo:` | relation | Relation → Circles (unidirectional →) |
| Energized By | `^E{Q` | relation | Relation → People (bidirectional ↔) ⭐ CANONICAL |
| People | `\\jhj` | relation | Relation → People (bidirectional ↔) ⚠️ LEGACY |
| Accountabilities | `ao\|K` | relation | Relation → Accountabilities (bidirectional ↔) |
| Domains | `ML_>` | relation | Relation → Domains (bidirectional ↔) |
| Policies | `iMxM` | relation | Relation → Policies (bidirectional ↔) |
| Role Status | `}yI~` | formula | Formula (computed from Energized By + Purpose) |
| Status (Legacy) | `}Mom` | select | Select (4 options: Active, Vacant, Proposed, Deprecated) ⚠️ DEPRECATED |

### Relations Summary

- **Circle** → Circles (unidirectional)
- **Energized By** ↔ People.**Energizes Roles** (bidirectional) — **USE THIS**
- **People** ↔ People.**Roles** (bidirectional) — **LEGACY, keep during transition**
- **Accountabilities** ↔ Accountabilities.**Role** (bidirectional)
- **Domains** ↔ Domains.**Controlling Role** (bidirectional)
- **Policies** ↔ Policies.**Roles** (bidirectional)

### Formulas

**Role Status:**
```
if(length(join(map({{Energized By}}, format(current)), ", ")) > 0, 
   "Active", 
   if(length({{Purpose}}) > 0, 
      "Proposed", 
      "Vacant"))
```
**Logic:** Has person → "Active"; no person but has Purpose → "Proposed"; neither → "Vacant"

### Key Design Notes

- **Energized By** is the canonical assignment relation (not People)
- **Role Status** is computed; ignore "Status (Legacy)"
- **Role Type** distinguishes structural roles (Lead, Rep, etc.) from Defined Roles
- **Row Count** field (added 2026-02-10) enables database-level aggregation

---

## People

**Database ID (REST):** `b981cd95-342b-4eb5-afa8-f38ac85c6c15`  
**Database ID (MCP):** `c2edc051-62cd-49cb-9805-38fa64d83a4f`  
**Title:** People  
**Last Edited:** 2026-02-08

### Properties

| Property Name | Property ID | Type | Details |
|--------------|-------------|------|---------|
| Name | `title` | title | Title (text) |
| First Name | `>tmc` | rich_text | Rich Text |
| Last Name | `BZ=~` | rich_text | Rich Text |
| Person Status | `HS}}` | select | Select (4 options: Active, External, Former, Pending) |
| Type | `uTUE` | select | Select (5 options: Team Member, Contractor, Volunteer, Advisor, Partner) |
| Email | `^BW}` | email | Email |
| Phone | `z^LL` | phone_number | Phone Number |
| Bio | `_Bnj` | rich_text | Rich Text |
| Location | `@[RE` | rich_text | Rich Text |
| Photo | `?\|yF` | files | Files & Media |
| Notes | `EMZJ` | rich_text | Rich Text |
| Start Date | `fjwz` | date | Date |
| End Date | `FS@[` | date | Date |
| Workspace Member | `b[RT` | checkbox | Checkbox |
| Created Date | `WyJ]` | created_time | Created Time (auto) |
| Last Updated | `c[dO` | last_edited_time | Last Edited Time (auto) |
| **Row Count** | `(TBD)` | formula | Formula: returns 1 per row |
| Primary Circle | `V~lz` | relation | Relation → Circles (bidirectional ↔) |
| Circle Memberships | `_>r<` | relation | Relation → Circles (bidirectional ↔) |
| Primary Role | `Y<LC` | relation | Relation → Roles (unidirectional →) |
| Energizes Roles | `t^~c` | relation | Relation → Roles (bidirectional ↔) ⭐ CANONICAL |
| Roles | `biLg` | relation | Relation → Roles (bidirectional ↔) ⚠️ LEGACY |
| Notion User | `}X<p` | people | People (Notion workspace user link) |
| Status 1 | `faEl` | formula | Formula (pulls from Primary Role Status) |

### Relations Summary

- **Primary Circle** ↔ Circles.**People (Primary Circle)** (bidirectional)
- **Circle Memberships** ↔ Circles.**Circle Members** (bidirectional)
- **Primary Role** → Roles (unidirectional)
- **Energizes Roles** ↔ Roles.**Energized By** (bidirectional) — **USE THIS**
- **Roles** ↔ Roles.**People** (bidirectional) — **LEGACY**

### Formulas

**Status 1:**
```
if(
  empty({{Primary Role}}) or {{Primary Role}}.length() == 0,
  empty(),
  if(
    empty({{Primary Role}}.first().{{Status (Legacy)}}),
    empty(),
    {{Primary Role}}.first().{{Status (Legacy)}}
  )
)
```
**Logic:** Pulls status from Primary Role's "Status (Legacy)" field

**⚠️ TODO:** Update this formula to reference "Role Status" instead of "Status (Legacy)"

### Key Design Notes

- **Energizes Roles** is canonical for role assignment (not Roles)
- **Circle Memberships** is separate from role assignment — must be managed explicitly
- **Person Status** is lifecycle management (Active → Former)
- **Status 1** formula needs update to use Role Status instead of legacy field
- **Row Count** field (added 2026-02-10) enables database-level aggregation

---

## Accountabilities

**Database ID (REST):** `2eb36f74-3758-809a-9745-f040cb48a5fe`  
**Database ID (MCP):** `2eb36f74-3758-8086-8cc9-000bb45bfa91`  
**Title:** Accountabilities  
**Last Edited:** 2026-02-10

### Properties

| Property Name | Property ID | Type | Details |
|--------------|-------------|------|---------|
| Name | `title` | title | Title (text) |
| Description | `Y~qt` | rich_text | Rich Text |
| Status | `PE\\=` | select | Select (5 options: Active, Proposed, Evolving, Deprecated, Transferred) |
| Frequency | `@Zcj` | select | Select (7 options: Active, Weekly, Monthly, Quarterly, Annually, Ongoing, As-Needed) |
| Complexity | `E\\\`k` | select | Select (3 options: Simple, Moderate, Complex) |
| Notes | `>fu>` | rich_text | Rich Text |
| Created Date | `hy[A` | created_time | Created Time (auto) |
| Last Updated | `UjYP` | last_edited_time | Last Edited Time (auto) |
| **Row Count** | `(TBD)` | formula | Formula: returns 1 per row |
| Owning Circle | `sKkL` | relation | Relation → Circles (bidirectional ↔) ⭐ MANDATORY |
| Role | `jv\`N` | relation | Relation → Roles (bidirectional ↔) ⭐ OPTIONAL |
| Dependencies | `}gp\`` | relation | Relation → Circles (bidirectional ↔) |
| Related Domains | `;<kH` | relation | Relation → Domains (bidirectional ↔) |
| Circle (via Role) | `xBTc` | rollup | Rollup from "Role" → "Circle" ⚠️ LEGACY |

### Relations Summary

- **Owning Circle** ↔ Circles.**Accountabilities** (bidirectional) — **ALWAYS SET**
- **Role** ↔ Roles.**Accountabilities** (bidirectional) — **OPTIONAL**
- **Dependencies** ↔ Circles.**Dependent Accountabilities** (bidirectional)
- **Related Domains** ↔ Domains.**Related Accountabilities** (bidirectional)

### Rollups

**Circle (via Role):**
- Rolls up from: `Role` → `Circle`
- Function: `show_original`
- **Status:** Legacy — will be deleted after validation period

### Key Design Notes — CRITICAL ⚠️

**The Owning Circle Rule (discovered 2026-02-08):**

1. **Owning Circle** must ALWAYS be set manually — it does NOT auto-populate from Role
2. **Owning Circle** is independent of the **Role** field
3. Accountabilities can exist at Circle level (Role empty → Circle Lead holds implicitly)
4. Accountabilities can be assigned to specific Roles within the Circle

**Lifecycle:**
1. Created at Circle level: Owning Circle = the circle, Role = empty
2. Assigned to Role: Owning Circle stays the same, Role = specific role
3. Moved between Circles: Change Owning Circle, update Role if needed

**The rollup "Circle (via Role)" will be deleted** after validation that Owning Circle is properly populated everywhere.

**Row Count** field (added 2026-02-10) enables database-level aggregation

---

## Domains

**Database ID (REST):** `2eb36f74-3758-80a6-aa0e-f54f72dc24f3`  
**Database ID (MCP):** `2eb36f74-3758-80b9-a49d-000b3a7a87ef`  
**Title:** Domains  
**Last Edited:** 2026-02-07

### Properties

| Property Name | Property ID | Type | Details |
|--------------|-------------|------|---------|
| Name | `title` | title | Title (text) |
| Description | `pMie` | rich_text | Rich Text |
| Status | `n\\lZ` | select | Select (3 options: Active, Proposed, Deprecated) |
| Type | `=Quw` | select | Select (7 options: Relationship, Data, Budget, Process, Asset, Decision Authority, Resource) |
| Tangibility | `t]R;` | select | Select (4 options: Physical, Digital, Conceptual, Financial) |
| Notes | `R?FQ` | rich_text | Rich Text (note: was Date field, fixed) |
| Created Date | `OWKs` | created_time | Created Time (auto) |
| Last Updated | `Iq<t` | last_edited_time | Last Edited Time (auto) |
| **Row Count** | `(TBD)` | formula | Formula: returns 1 per row |
| Controlling Role | `>tzr` | relation | Relation → Roles (bidirectional ↔) |
| Shared With | `[x\|K` | relation | Relation → Circles (bidirectional ↔) |
| Related Accountabilities | `PVRi` | relation | Relation → Accountabilities (bidirectional ↔) |
| Policies Applied | `;PVc` | relation | Relation → Policies (bidirectional ↔) |
| Controlling Circle | `vvb~` | rollup | Rollup from "Controlling Role" → "Circle" |

### Relations Summary

- **Controlling Role** ↔ Roles.**Domains** (bidirectional)
- **Shared With** ↔ Circles.**Domains** (bidirectional)
- **Related Accountabilities** ↔ Accountabilities.**Related Domains** (bidirectional)
- **Policies Applied** ↔ Policies.**Policies Applied** (bidirectional)

### Rollups

**Controlling Circle:**
- Rolls up from: `Controlling Role` → `Circle`
- Function: `show_original`
- Purpose: Show which Circle controls this Domain (via the controlling Role)

### Key Design Notes

- **Controlling Role** is the primary control mechanism (not Circle directly)
- **Shared With** allows Domains to be shared across multiple Circles
- **Type** categorizes the kind of domain (Resource, Data, etc.)
- **Tangibility** categorizes how concrete the domain is
- **Row Count** field (added 2026-02-10) enables database-level aggregation

---

## Policies

**Database ID (REST):** `2de36f74-3758-8128-a650-ef7069aa6bd7`  
**Database ID (MCP):** `2de36f74-3758-8118-8a20-000b3d60d38e`  
**Title:** Policies  
**Last Edited:** 2026-02-09

### Properties

| Property Name | Property ID | Type | Details |
|--------------|-------------|------|---------|
| Name | `title` | title | Title (text) |
| Policy Text | `PbHN` | rich_text | Rich Text |
| Rationale | `DpNB` | rich_text | Rich Text |
| Status | `fcR;` | select | Select (4 options: Active, Proposed, Under Review, Deprecated) |
| Scope | `dQRa` | select | Select (3 options: Circle-Internal, Cross-Circle, Organization-Wide) |
| Category | `>kdY` | select | Select (6 options: Resource Allocation, Quality Standard, Coordination, Safety, Financial, Compliance) |
| Enforcement | `hN=c` | select | Select (3 options: Mandatory, Guideline, Best Practice) |
| Review Date | `_E\`\|` | date | Date |
| Created Date | `z>Bu` | created_time | Created Time (auto) |
| Last Updated | `HLT;` | last_edited_time | Last Edited Time (auto) |
| **Row Count** | `(TBD)` | formula | Formula: returns 1 per row |
| Affects | `Jn\\\\` | relation | Relation → Circles (bidirectional ↔) |
| Created By | `oim=` | relation | Relation → Circles (unidirectional →) |
| Applies To | `g_Cl` | relation | Relation → Domains (bidirectional ↔) |
| Roles | `uRkc` | relation | Relation → Roles (bidirectional ↔) |

### Relations Summary

- **Affects** ↔ Circles.**Affecting Policies** (bidirectional)
- **Created By** → Circles (unidirectional)
- **Applies To** ↔ Domains.**Policies Applied** (bidirectional)
- **Roles** ↔ Roles.**Policies** (bidirectional)

### Key Design Notes

- **Affects** can point to multiple Circles (for cross-circle policies)
- **Created By** shows which Circle authored the policy
- **Scope** categorizes policy reach (Circle-Internal, Cross-Circle, Organization-Wide)
- **Enforcement** level indicates how mandatory the policy is
- **Row Count** field (added 2026-02-10) enables database-level aggregation

---

## Tensions

**Database ID (REST):** `2de36f74-3758-8129-b052-f8ad10f18340`  
**Database ID (MCP):** `2de36f74-3758-816e-a143-000b7905cce8`  
**Title:** Tensions  
**Created:** 2026-01-04  
**Last Edited:** 2026-02-21

### Properties

| Property Name | Property ID | Type | Details |
|--------------|-------------|------|---------|
| Title | `title` | title | Title (text) |
| Description | `]p;=` | rich_text | Rich Text |
| Status | `]nU:` | select | Select (4 options: Open, Processing, Closed, Resolved) |
| Priority | `d}iO` | select | Select (4 options: Urgent, High, Medium, Low) |
| ID | `n{<r` | unique_id | Auto-incrementing unique ID (no prefix) |
| RaisedBy | `[RC;` | people | Notion workspace people field |
| ResolvedAt | `LH^C` | date | Date resolved |
| **Row Count** | `qC[]` | formula | Formula: returns 1 per row |
| Related Circle | `Wa{\`` | relation | Relation → Circles (unidirectional →) |

### Relations Summary

- **Related Circle** → Circles (unidirectional — tension belongs to a circle)

### Status Options

| Status | Color | Meaning |
|--------|-------|---------|
| Open | brown | Newly raised, not yet processed |
| Processing | green | Being actively worked |
| Closed | orange | Closed without resolution |
| Resolved | red | Successfully resolved |

### Priority Options

| Priority | Color |
|----------|-------|
| Urgent | gray |
| High | yellow |
| Medium | brown |
| Low | default |

### Key Design Notes

- **Tensions** is used for Holacracy governance tension-processing workflow
- **RaisedBy** links to Notion workspace users (not the People DB)
- **Related Circle** is unidirectional (Circles do not have a reverse Tensions relation)
- **Status** lifecycle: Open → Processing → Resolved or Closed
- Dashboard metric queries for `Status = "Open"` to get the open tension count
- As of 2026-02-21: 1 Open tension ("Governance Meeting Overdue"), 1 Resolved

---

## Cross-Database Relationship Map

Complete view of all relations between databases:

### Circles
- Circles.**Super-circle** ↔ Circles.**Sub-circles** (self-referential)
- Circles.**Circle Lead** → Roles
- Circles.**Circle Rep** → Roles
- Circles.**Secretary** → Roles
- Circles.**Facilitator** → Roles
- Circles.**Circle Members** ↔ People.**Circle Memberships**
- Circles.**People (Primary Circle)** ↔ People.**Primary Circle**
- Circles.**Domains** ↔ Domains.**Shared With**
- Circles.**Accountabilities** ↔ Accountabilities.**Owning Circle** ⭐
- Circles.**Dependent Accountabilities** ↔ Accountabilities.**Dependencies**
- Circles.**Affecting Policies** ↔ Policies.**Affects**

### Roles
- Roles.**Circle** → Circles
- Roles.**Energized By** ↔ People.**Energizes Roles** ⭐
- Roles.**People** ↔ People.**Roles** (legacy)
- Roles.**Accountabilities** ↔ Accountabilities.**Role**
- Roles.**Domains** ↔ Domains.**Controlling Role**
- Roles.**Policies** ↔ Policies.**Roles**

### People
- People.**Primary Circle** ↔ Circles.**People (Primary Circle)**
- People.**Circle Memberships** ↔ Circles.**Circle Members**
- People.**Primary Role** → Roles
- People.**Energizes Roles** ↔ Roles.**Energized By** ⭐
- People.**Roles** ↔ Roles.**People** (legacy)

### Accountabilities
- Accountabilities.**Owning Circle** ↔ Circles.**Accountabilities** ⭐
- Accountabilities.**Role** ↔ Roles.**Accountabilities**
- Accountabilities.**Dependencies** ↔ Circles.**Dependent Accountabilities**
- Accountabilities.**Related Domains** ↔ Domains.**Related Accountabilities**

### Domains
- Domains.**Controlling Role** ↔ Roles.**Domains**
- Domains.**Shared With** ↔ Circles.**Domains**
- Domains.**Related Accountabilities** ↔ Accountabilities.**Related Domains**
- Domains.**Policies Applied** ↔ Policies.**Applies To**

### Policies
- Policies.**Affects** ↔ Circles.**Affecting Policies**
- Policies.**Created By** → Circles
- Policies.**Applies To** ↔ Domains.**Policies Applied**
- Policies.**Roles** ↔ Roles.**Policies**

### Tensions
- Tensions.**Related Circle** → Circles (unidirectional)

---

## Summary Statistics

- **Total Databases:** 7
- **Total Properties:** ~157 (added Tensions DB with 9 properties)
- **Bidirectional Relations:** 18
- **Unidirectional Relations:** 6 (added Tensions → Circles)
- **Formulas:** 2 (Role Status, People Status 1) + 7 Row Count formulas
- **Rollups:** 5 (Controlling Circle + 3 count rollups + Circle via Role legacy)
- **Last Schema Changes:** 2026-02-22 (Tensions DB documented; Roles Row Count ID resolved)

---

## Recent Schema Changes

### 2026-02-22: Tensions DB Documented; Roles Row Count ID Resolved
- Added Tensions database to schema docs (existed since 2026-01-04, was accidentally omitted)
- Confirmed Roles `Row Count` property ID = `w]pd` (was listed as TBD)
- **Root cause of 2026-02-21 "no Tensions database" error:** DB missing from this file

### 2026-02-10: Row Count Fields & Aggregation Columns
- Added `Row Count` formula field to all 6 databases (via Notion AI agent)
- Returns `1` per record; can be summed for database-level row count
- Added `Accountability Count`, `Domain Count`, `Policy Count` rollups to Circles
- **Purpose:** Enable real-time database aggregation and audit reporting

### 2026-02-08: Accountabilities Owning Circle
- Added `Accountabilities.Owning Circle` (relation → Circles, bidirectional)
- Auto-created `Circles.Accountabilities` (reverse side)
- Renamed `Accountabilities.Circle` to `Circle (via Role)` (rollup, marked legacy)
- **Impact:** Implements Circle-as-Role model from Holacracy v5
- **Action Required:** Always set Owning Circle when creating Accountabilities

### 2026-02-07: Roles Policies Relation
- Replaced broken date field `Roles.Policies` with proper relation to Policies DB
- Auto-created `Policies.Roles` (reverse side)
- **Impact:** Roles can now be properly linked to Policies

---

*End of auto-generated documentation*
