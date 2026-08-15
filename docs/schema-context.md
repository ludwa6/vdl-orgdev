# OrgDev HolaFlow Database Schema — Complete Reference

**Last Updated:** 2026-02-07 (Opus 4.6 session)
**Status:** Fix #1 complete, Fix #2 pending

---

## Database IDs

| Database | Page ID (database_id) | Data Source ID (data_source_id) |
|---|---|---|
| Circles | `2de36f74-3758-81bf-83c8-c9c69b114bc4` | `2de36f74-3758-8122-ac4a-000b520202bf` |
| Roles | `2de36f74-3758-8138-b40c-d2bbdb243419` | `2de36f74-3758-8123-8fda-000b5d5af434` |
| Domains | `2eb36f74-3758-80a6-aa0e-f54f72dc24f3` | `2eb36f74-3758-80b9-a49d-000b3a7a87ef` |
| Accountabilities | `2eb36f74-3758-809a-9745-f040cb48a5fe` | `2eb36f74-3758-8086-8cc9-000bb45bfa91` |
| Policies | `2de36f74-3758-8128-a650-ef7069aa6bd7` | `2de36f74-3758-8118-8a20-000b3d60d38e` |
| People | `b981cd95-342b-4eb5-afa8-f38ac85c6c15` | `c2edc051-62cd-49cb-9805-38fa64d83a4f` |
| Organizations | (not used in this session) | — |
| Tensions | (not used in this session) | — |
| Meetings | (not used in this session) | — |
| Context | (not used in this session) | — |

---

## Circle Pages (IDs)

| Circle | Page ID | Super-circle |
|---|---|---|
| VdL Farm | `2e336f74-3758-808a-930b-ea6e793d9f2a` | (top-level) |
| Farm Ops | `2e336f74-3758-8065-96e6-f75db46e9fb3` | VdL Farm |
| Casa Ops | `2e336f74-3758-8092-91bf-c1952e50e230` | VdL Farm |
| OMG: Organic Market Garden | (pre-existing) | Farm Ops |
| HFC: Holistic Farm Care | (pre-existing) | Farm Ops |
| Restaurant | `2ff36f74-3758-81e6-9610-d90d8c080904` | Casa Ops |
| B&B Accommodations | `2ff36f74-3758-8124-ae64-d339ce245653` | Casa Ops |
| Activities | `2ff36f74-3758-815b-a395-fc127aa0f97f` | Casa Ops |
| Groups & Retreats | `2ff36f74-3758-8184-b772-d3e90fcb3c49` | Casa Ops |

---

## Key Relations Between Databases

### Circles DB Properties (key ones)
- **Sub-circles** / **Super-circle**: Self-relation (dual_property) within Circles DB
- **Roles**: Relation to Roles DB (dual_property)
- **Domains**: Relation to Domains DB (dual_property)
- **Accountabilities**: Relation to Accountabilities DB (dual_property)
- **Policies**: Relation to Policies DB — auto-created by Fix #1 as reverse side of Roles→Policies relation. Property ID on Policies side: `uRkc`

### Roles DB Properties (key ones)
- **Circle**: Relation to Circles DB (dual_property)
- **Domains**: Relation to Domains DB (dual_property)
- **Accountabilities**: Relation to Accountabilities DB (dual_property)
- **Policies**: Relation to Policies DB (dual_property) — Property ID: `iMxM`. Created in Fix #1 to replace broken date field.

### Policies DB Properties (key ones)
- **Affects**: Relation to Circles DB — ⚠️ CURRENTLY single_property (unidirectional). Property ID: `%60AAo` (URL-encoded; raw: `` `AAo ``). **This is Fix #2.**
- **Created By**: Relation to Circles DB — also single_property. Property ID: `oim%3D` (URL-encoded; raw: `oim=`). Walt hasn't requested converting this one.
- **Roles**: Relation to Roles DB (dual_property) — auto-created by Fix #1. Property ID: `uRkc`.
- **Scope**: Select property with options including "Cross-Circle"

### Domains DB Properties (key ones)
- **Circle**: Relation to Circles DB (dual_property)
- **Roles**: Relation to Roles DB (dual_property)

### Accountabilities DB Properties (key ones)
- **Roles**: Relation to Roles DB (dual_property)
- **Circle**: Rollup from Roles→Circle

---

## Fix #1 — COMPLETED ✅

**Problem:** Roles DB had a "Policies" property of type `date` instead of a relation to Policies DB.

**What was done:**
1. Deleted the broken "Policies" date field (old property ID: `>imA`) from Roles DB
2. Created new "Policies" as a dual_property relation pointing to Policies DB
   - Roles DB side: property ID `iMxM`
   - Policies DB side (auto-created "Roles"): property ID `uRkc`
3. Verified both sides resolve correctly

---

## Fix #2 — PENDING ⏳

**Problem:** The "Affects" property on Policies DB is a `single_property` relation to Circles DB. This means:
- Setting "Affects" on a Policy page points it to a Circle ✅
- But the Circles DB does NOT get an auto-populated "Policies" (or similar) property showing which policies affect it ❌
- Per the Holacracy Constitution v5.0, a Policy can affect multiple circles, and circles should be able to see which policies affect them

**Goal:** Convert "Affects" from single_property to dual_property so that:
- Policies can still point to Circles via "Affects" ✅
- Circles automatically show a reverse property (e.g., "Affecting Policies") listing all policies that affect them ✅

### Critical Details for Fix #2

**Current "Affects" property:**
- Property ID: `%60AAo` (URL-encoded) / `` `AAo `` (raw)
- Type: `relation` with `single_property` configuration
- Points to: Circles DB (database_id: `2de36f74-3758-81bf-83c8-c9c69b114bc4`)
- Has existing data: ~19 policies point to circles through it

**Target state:**
- Same property name "Affects"
- Type: `relation` with `dual_property` configuration  
- Points to: Circles DB (database_id: `2de36f74-3758-81bf-83c8-c9c69b114bc4`, data_source_id: `2de36f74-3758-8122-ac4a-000b520202bf`)
- Synced property on Circles side: suggest name "Affecting Policies" (or "Policies Affecting")

### Procedure for Fix #2

The Notion API does NOT support converting a single_property relation to dual_property in place. You must:

1. **Query all policies** to record their current "Affects" values:
   - Use `API-query-data-source` on Policies DB data_source_id `2de36f74-3758-8118-8a20-000b3d60d38e`
   - For each policy page, note its page ID and the circle page ID(s) in the "Affects" relation
   - There are approximately 19 policies with Affects data (1 pre-existing + 13 sub-circle + 5 interface)

2. **Delete the existing "Affects" single_property:**
   - Use `API-update-a-data-source` on Policies DB data_source_id
   - Set `properties.Affects` to `null` to delete it

3. **Create new "Affects" as dual_property:**
   - Use `API-update-a-data-source` on Policies DB data_source_id
   - Create property named "Affects" with type `relation`, configuration:
     ```json
     {
       "type": "relation",
       "relation": {
         "database_id": "2de36f74-3758-81bf-83c8-c9c69b114bc4",
         "data_source_id": "2de36f74-3758-8122-ac4a-000b520202bf",
         "type": "dual_property",
         "dual_property": {
           "synced_property_name": "Affecting Policies"
         }
       }
     }
     ```

4. **Re-populate all Affects relations:**
   - For each policy page recorded in step 1, use `API-patch-page` to set the "Affects" property back to its original circle ID(s)
   - The new property will have a DIFFERENT property ID than the old one, so reference by name

5. **Verify:**
   - Check a few policies still point to their circles
   - Check the Circles DB now has the "Affecting Policies" property auto-populated
   - Specifically verify Casa Ops circle shows the 5 interface policies

### Important API Notes

- When creating a dual_property relation, you MUST provide both `database_id` AND `data_source_id` in the relation config, or you'll get a validation error
- Property IDs change when you delete and recreate — always reference the new property by name after recreation
- The `API-query-data-source` tool returns pages with their properties; look for the "Affects" relation field in each result
- `API-patch-page` sets relation values as: `{"Affects": {"relation": [{"id": "<circle-page-id>"}]}}`

---

## Naming Conventions

- **circleLead: [Circle Name]** — e.g., "circleLead: Restaurant"
- **circleRep: [Circle Name]** — e.g., "circleRep: Restaurant"
- **Secretary: [Circle Name]** — e.g., "Secretary: Restaurant"
- Database formerly called "Domain Elements" was renamed to **"Domains"** (both the DB title and all relation properties referencing it)

---

## Content Created This Session

### Sub-circles (4 new under Casa Ops)
Restaurant, B&B Accommodations, Activities, Groups & Retreats

### Roles (12 new, 3 per sub-circle)
circleLead, circleRep, Secretary for each sub-circle

### Accountabilities (21 new)
6 for Restaurant, 5 each for B&B, Activities, Groups & Retreats

### Domains (25 new)
Distributed across all 4 sub-circles

### Policies (18 new)
13 sub-circle policies + 5 cross-circle interface policies (Scope="Cross-Circle", Affects=Casa Ops)

---

## Additional Notes

- The "Created By" property on Policies (ID: `oim%3D`) is also single_property to Circles. Walt has not requested converting this, but it has the same limitation as "Affects". Worth noting for future cleanup.
- Interface policies currently set Affects=Casa Ops as a workaround since the single_property relation only supports one circle. After Fix #2 (dual_property), these could potentially be updated to point to multiple circles if needed.
- All relations in the system are ID-based, so renaming properties is safe and does not break links.
