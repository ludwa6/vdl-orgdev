See downloaded file for complete reconciliation guide.

This document shows how to update your existing HolaFlow Notion databases to match the complete Holacracy v5.0 specification.

## What You Already Have
- ✅ Circles
- ✅ Roles  
- ✅ Tensions
- ✅ Meetings
- ✅ Policies

## What to Create
- ❌ Domain Elements (new)
- ❌ Accountabilities (new)

## Key Updates Needed

**Nomenclature (v4.0 → v5.0):**
- Lead Link → Circle Lead
- Rep Link → Circle Rep

**New Fields to Add:**
- Circles: Level, rollups for Domain/Accountability/Policy counts
- Roles: Domain Elements relation, Accountabilities relation, Assignment Date
- Policies: Applies To (Domain Elements relation), Enforcement

**Step-by-Step Migration Plan:**
1. Update existing databases (rename fields, add properties)
2. Create 2 new databases (Domain Elements, Accountabilities)
3. Add missing relations between databases
4. Set up rollups
5. Populate initial data

Includes database-by-database comparison tables showing what to keep, rename, add, or modify.

Preserves HolaFlow compatibility while adding proper Holacracy structure.