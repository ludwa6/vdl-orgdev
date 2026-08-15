# VdL OrgDev — Data Administration Guide

## Purpose

This document maps every data administration scenario in the Holacracy OrgDev system: what changes are made manually, what cascades automatically, where the UX traps are, and what safeguards are needed. It exists because Notion's table-view UX makes it dangerously easy to delete entire records when you only meant to edit a relation field.

---

## 1. The Three Databases and Their Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                        CIRCLES                               │
│  Manual: Name, Purpose, Status, Notes, Level                 │
│  Relations: Super-circle↔Sub-circles (self-referential)      │
│             Circle Lead → Roles (single, one-way)            │
│             Circle Rep → Roles (single, one-way)             │
│             Secretary → Roles (single, one-way)              │
│             Facilitator → Roles (single, one-way)            │
│             Circle Members ↔ People.Circle Memberships       │
│             People (Primary Circle) ↔ People.Primary Circle  │
│             Domains → Domains db                             │
│             Affecting Policies → Policies db                 │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
┌─────────────────┐  ┌─────────────────────────────────────────┐
│     PEOPLE      │  │                ROLES                     │
│                 │  │  Manual: Name, Purpose, Role Type,       │
│  Manual: Name,  │  │          Circle, Notes, Assignment Date  │
│  First/Last,    │  │                                          │
│  Person Status, │  │  ═══ CANONICAL ASSIGNMENT ═══            │
│  Type, Email,   │  │  Energized By ↔ People.Energizes Roles  │
│  Phone, Bio,    │  │  (bidirectional — edit from EITHER side) │
│  Photo, etc.    │  │                                          │
│                 │  │  ═══ LEGACY (redundant) ═══              │
│  Computed:      │  │  People ↔ People.Roles                   │
│  Status 1       │  │  (keep populated during transition)      │
│  (formula)      │  │                                          │
│                 │  │  Computed:                                │
│                 │  │  Role Status (formula):                   │
│                 │  │    Energized By populated → "Active"      │
│                 │  │    Empty + has Purpose → "Proposed"       │
│                 │  │    Empty + no Purpose → "Vacant"          │
│                 │  │                                          │
│                 │  │  Status (Legacy) — manual select, ignore  │
└─────────────────┘  └─────────────────────────────────────────┘
```

### Key Principle: Bidirectional Relations

When Notion creates a relation between two databases, it creates a **paired property on each side**. Editing one side auto-updates the other. This means:

- Adding "Walt" to a Role's "Energized By" field **also** adds that Role to Walt's "Energizes Roles" field.
- Removing "Walt" from a Role's "Energized By" **also** removes that Role from Walt's "Energizes Roles".
- The same edit can be made from **either** database — the effect is identical.

This is important for choosing where to make changes (see Section 3).

---

## 2. Field Classification

### Fields You Edit Manually

| Database | Field | When to Edit | Notes |
|----------|-------|-------------|-------|
| **Circles** | Name | Circle creation/rename | — |
| **Circles** | Purpose | Governance meeting output | — |
| **Circles** | Status | Circle activation/deactivation | Active or Inactive |
| **Circles** | Super-circle | Restructuring circles | Changes hierarchy; cascades to Sub-circles on other side |
| **Circles** | Circle Lead | Governance: assign lead role to circle | Points to a Role record, NOT a Person |
| **Circles** | Circle Rep | Governance: assign rep role to circle | Points to a Role record, NOT a Person |
| **Circles** | Secretary | Governance: assign secretary role | Points to a Role record, NOT a Person |
| **Circles** | Facilitator | Governance: assign facilitator role | Points to a Role record, NOT a Person |
| **Circles** | Circle Members | Add/remove people from circle | Bidirectional with People.Circle Memberships |
| **Roles** | Name | Role creation/rename | — |
| **Roles** | Purpose | Governance meeting output | — |
| **Roles** | Role Type | Role creation | Circle Lead, Circle Rep, Secretary, Facilitator, Defined Role |
| **Roles** | Circle | Role creation | Which circle this role belongs to |
| **Roles** | Energized By | **Assign/unassign person to role** | ⚠️ See Section 3 for safe editing method |
| **Roles** | Assignment Date | When person was assigned | Manual — not auto-set |
| **People** | Name, First/Last | Person onboarding | — |
| **People** | Person Status | Active/External/Former/Pending | Manual lifecycle management |
| **People** | Type | Team Member/Contractor/Volunteer/etc. | — |
| **People** | Primary Circle | Person's home circle | — |
| **People** | Circle Memberships | Circles this person participates in | Bidirectional with Circles.Circle Members |
| **People** | Energizes Roles | **Assign/unassign roles** | Same data as Roles.Energized By — edit from either side |

### Fields That Compute Automatically

| Database | Field | Derives From | Logic |
|----------|-------|-------------|-------|
| **Roles** | Role Status (formula) | Energized By + Purpose | Has person → "Active"; no person but has Purpose → "Proposed"; neither → "Vacant" |
| **People** | Status 1 (formula) | Primary Role → Status (Legacy) | Pulls status from the person's Primary Role record (currently references the legacy Status field — needs update) |

### Fields That Are Legacy / To Be Removed

| Database | Field | Replacement | Action Needed |
|----------|-------|------------|---------------|
| **Roles** | Status (Legacy) | Role Status (formula) | Hide from views; delete after validation period |
| **Roles** | People | Energized By | Keep populated during transition; remove after proxy uses only Energizes Roles |
| **People** | Roles | Energizes Roles | Same as above; paired with Roles.People |

---

## 3. Data Admin Scenarios — How To Do Each One Safely

### ⚠️ THE CRITICAL UX TRAP

In Notion table view, clicking on a relation chip (like a person's name in "Energized By") and pressing Delete or choosing "Delete" from the context menu **deletes the entire database row**, not just the relation entry. This has already caused accidental deletion of the Finance and Marketing role records.

**SAFE METHODS for editing relations:**

1. **Open the record first** (click the row title to expand the page), then edit the relation field in page view. The relation field shows an × button on each entry — click that to remove.

2. **From the People side**: Open the Person's record, edit "Energizes Roles" to add/remove roles. This is often safer because you're less likely to accidentally delete a Person record (they have more visible content).

3. **Via API/Claude**: Ask Claude to make the change via the Notion API. Zero risk of accidental deletion.

### Scenario A: Assign a Person to a Role

**What you do:** Add the person to the Role's "Energized By" field (or add the Role to the Person's "Energizes Roles" field — same effect).

**What cascades automatically:**
- Role Status formula updates to "Active"
- The reverse side of the relation auto-populates
- OrgMap (after refresh) shows the person connected to the role's circle

**What does NOT cascade (manual follow-up needed):**
- The legacy "People" field on Roles does NOT auto-update (it's a separate relation)
- "Circle Memberships" on the Person is NOT auto-updated — if the person isn't already a member of the role's circle, add them
- "Assignment Date" is NOT auto-set — fill in manually if tracking

**Recommended entry point:** Open the **Role** record → edit "Energized By"

### Scenario B: Remove a Person from a Role (Unassign)

**What you do:** Remove the person from the Role's "Energized By" field.

**⚠️ DO NOT do this by clicking the relation chip in table view.** Open the record first.

**What cascades automatically:**
- Role Status formula updates to "Proposed" (if Purpose exists) or "Vacant" (if no Purpose)
- The reverse side (Person's "Energizes Roles") auto-removes the role

**What does NOT cascade:**
- Circle Memberships remain (person may still be in the circle via other roles)
- Legacy "People" field not updated

**Recommended entry point:** Open the **Role** record → click × next to the person in "Energized By"

### Scenario C: Create a New Role

**What you do:** Create a new row in the Roles database.

**Required fields:** Name, Role Type, Circle

**Recommended fields:** Purpose (triggers "Proposed" status)

**What cascades:** Nothing until a person is assigned.

**OrgMap note:** Currently only Circle-type roles (Lead, Rep) create visible edges. Defined Roles don't appear on the map yet.

### Scenario D: Create a New Circle

**What you do:** Create a new row in Circles database.

**Required fields:** Name, Status, Super-circle (which circle contains this one)

**What cascades:**
- Super-circle's "Sub-circles" auto-populates
- Appears on OrgMap after refresh

**Follow-up needed:**
- Create the structural roles (Circle Lead, Circle Rep, Secretary, Facilitator) as Role records with appropriate Role Type
- Link those Role records to the Circle's Circle Lead / Circle Rep / Secretary / Facilitator fields
- Assign people to energize those roles

### Scenario E: Add a Person to a Circle (Membership)

**What you do:** Edit the Circle's "Circle Members" field OR the Person's "Circle Memberships" field (same effect, bidirectional).

**What cascades:**
- OrgMap shows the person as a "member" node connected to the circle

**Important:** Circle membership and role assignment are **independent**. A person can energize a role in a circle without being a formal member, and vice versa. In Holacracy, energizing a role in a circle generally implies membership, but the database doesn't enforce this — it must be managed manually.

### Scenario F: Deactivate a Person (Offboarding)

**What you do:** Set Person Status to "Former".

**What does NOT cascade (must do manually):**
- Their roles are NOT auto-unassigned — remove them from "Energizes Roles"
- Their circle memberships are NOT auto-removed
- The roles they held will flip to "Proposed" or "Vacant" once unassigned

**Recommended procedure:**
1. Open the Person record
2. Remove all entries from "Energizes Roles"
3. Remove all "Circle Memberships"
4. Set Person Status to "Former"
5. Set End Date

### Scenario G: Restructure Circles (Move a Sub-circle)

**What you do:** Change the Sub-circle's "Super-circle" relation.

**What cascades:**
- Old parent's "Sub-circles" auto-removes it
- New parent's "Sub-circles" auto-adds it
- OrgMap hierarchy updates

**What does NOT cascade:**
- People's Circle Memberships are unchanged
- Roles remain attached to the moved circle

---

## 4. The OrgMap Connection Model

The OrgMap proxy creates three types of edges between people and circles:

| Edge Type | How It's Determined | Data Source |
|-----------|-------------------|-------------|
| **"leads"** | Circle's "Circle Lead" role ID matches a role in the Person's role list | Circles.Circle Lead → Roles ← People.Energizes Roles |
| **"represents"** | Circle's "Circle Rep" role ID matches | Circles.Circle Rep → Roles ← People.Energizes Roles |
| **"energizes" (member)** | Person listed in Circle's members | People.Circle Memberships ↔ Circles.Circle Members |

**Key insight:** Lead and Rep connections are **indirect** — they go through the Roles database. The circle doesn't point to a person directly; it points to a Role, and the proxy checks who energizes that role. This means:

- Changing who leads a circle = changing who energizes the Circle Lead role (not editing the Circle record)
- A person appears as "disconnected" on the OrgMap if they have no Circle Memberships AND don't energize any Circle Lead/Rep roles

---

## 5. Cleanup Tasks Still Pending

### Immediate
- [ ] Remove legacy "Status (Legacy)" from all Roles database views (hide column)
- [ ] Verify "Role Status" formula column is visible in all Roles views
- [ ] Update People."Status 1" formula to reference "Role Status" instead of "Status (Legacy)"

### After Validation Period (1-2 weeks)
- [ ] Remove legacy "People" relation from Roles database
- [ ] Remove legacy "Roles" relation from People database
- [ ] Remove "Status (Legacy)" select field from Roles database
- [ ] Update proxy to stop merging legacy field

### Data Hygiene
- [ ] Sync Circle Memberships for Walt and Nita (currently empty — they energize roles but aren't listed as circle members)
- [ ] Review Charlotte person record (created via relation field — has no First Name, Last Name, Person Status, or Type set)
- [ ] Clean up orphaned Anna Pelegrim record (Energizes Roles and Circle Memberships are empty)
- [ ] Confirm all circleLead/circleRep roles have correct Role Type set

---

## 6. Safe Editing Cheat Sheet

| I want to... | Do this | Don't do this |
|--------------|---------|---------------|
| Assign someone to a role | Open Role record → add to "Energized By" | Click relation chip in table view |
| Unassign someone from a role | Open Role record → click × on their name | Ctrl-click chip in table view → Delete |
| See all of someone's roles | Open Person record → look at "Energizes Roles" | — |
| Change circle leadership | Open the Circle Lead role → change "Energized By" | Edit Circle record directly (it points to the Role, not the Person) |
| Check if a role is filled | Look at "Role Status" column | Don't look at "Status (Legacy)" |

---

*Document created: 2026-02-08*
*Based on schema analysis of Circles, Roles, and People databases*
