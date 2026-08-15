# Complete Notion Database Specifications - REVISED
Vale da Lama OrgDev Governance System - Holacracy v5.0

**IMPORTANT:** This is the corrected version that properly separates Circles and Roles.

---

## Database Architecture Overview

```
CIRCLES (containers)
   ↓ contains
ROLES (fundamental building blocks)
   ↓ controls
DOMAIN ELEMENTS (resources)
   ↓ holds
ACCOUNTABILITIES (ongoing work)
   ↓ constrained by
POLICIES (rules)

PEOPLE energize ROLES
TENSIONS drive GOVERNANCE
MEETINGS process TENSIONS
```

---

## Critical Changes from Original Specification

### What Changed

1. **ADDED: Roles database** ⭐ - This was completely missing!
2. **CHANGED: Circles database** - Core role properties now point to Roles, not People
3. **CHANGED: Domain Elements** - Now controlled by Roles, not Circles
4. **CHANGED: Accountabilities** - Now held by Roles, not Circles
5. **UPDATED: Nomenclature** - Lead Link → Circle Lead, Rep Link → Circle Rep (v5.0)

### Why This Matters

**WRONG (Original):**
- Accountabilities belong to Circles
- People are assigned to Circles
- Unclear who does what

**CORRECT (Revised):**
- Accountabilities belong to Roles
- People energize Roles
- Crystal clear: Role X (energized by Person Y) holds Accountability Z

---

## Database Summary

### DATABASE 1: CIRCLES
**Purpose:** Track organizational containers (circles) that group roles together

**Key Change:** Circle Lead, Circle Rep, Facilitator, Secretary properties now point to ROLES (not People directly)

---

### DATABASE 2: ROLES ⭐ NEW/REVISED
**Purpose:** Track all roles (Core and Defined), who energizes them, their authority and work

**Core Roles (every circle has these 4):**
- Circle Lead (appointed)
- Circle Rep (elected)
- Facilitator (elected) 
- Secretary (elected)

**Defined Roles (created through governance):**
- BIO Certification Coordinator
- Crop Planning Coordinator
- etc.

---

### DATABASE 3: DOMAIN ELEMENTS (REVISED)
**Purpose:** Track specific resources and authorities

**Key Change:** Added "Controlling Role" property → points to specific Role, not Circle

---

### DATABASE 4: ACCOUNTABILITIES (REVISED)
**Purpose:** Track ongoing activities

**Key Change:** "Circle" property removed, replaced with "Role" → accountabilities belong to Roles

---

### DATABASES 5-7: POLICIES, TENSIONS, MEETINGS
**No changes from original specification**

---

## Visual Relationships

```
┌─────────────┐
│   CIRCLES   │
└──────┬──────┘
       │ contains
       ↓
┌─────────────┐        ┌─────────────┐
│    ROLES    │───────→│   PEOPLE    │
└──────┬──────┘ energized by
       │
       ├─── controls ──→ DOMAIN ELEMENTS ──→ constrained by ──→ POLICIES
       │
       └─── holds ────→ ACCOUNTABILITIES
```

---

## Revised Implementation Sequence

### Phase 1: Core Structure (Day 1)
1. Create Circles database
2. Create **Roles database** ⭐
3. Enter 4 circles
4. **Create 4 Core Roles for EACH circle**
5. Link Circles to their Core Roles
6. Assign people to Core Roles

### Phase 2: Domain & Accountabilities (Day 2)
1. Create Domain Elements database
2. Create Accountabilities database
3. Define Core Role accountabilities
4. Link accountabilities to **Roles** (not Circles!)
5. Link domain elements to **Roles** (not Circles!)

### Phase 3: Defined Roles (Day 3)
1. Create initial Defined Roles
2. Assign domain/accountabilities to these roles
3. Assign people to energize roles

### Phase 4-5: Policies, Tensions, Meetings
(As originally specified)

---

## Quick Reference

**One person can energize multiple roles:**
- João: Circle Lead + Crop Planning Coordinator
- Pedro: Secretary + BIO Certification Coordinator
- This is NORMAL and HEALTHY!

**Roles can be vacant:**
- Surplus Sales Coordinator: VACANT
- Circle Lead temporarily holds accountabilities

**Core Roles exist in every circle:**
- Circle Lead, Circle Rep, Facilitator, Secretary
- Created automatically when you create a Circle

---

See downloaded files for complete specifications:
- ROLES-DATABASE-SPECIFICATION.md (detailed role database spec)
- VISUAL-DIAGRAMS.md (visual relationship diagrams)
- Original database specs (Circles, Domain, Accountabilities, Policies, Tensions, Meetings)