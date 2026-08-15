# OrgDev System Architecture - Visual Diagrams
Vale da Lama - Holacracy v5.0

Visual representation of how Circles, Roles, People, Domain, Accountabilities, and Policies relate to each other.

---

## 1. FUNDAMENTAL ONTOLOGY

```
         ROLES are defined by:
         
         ┌─────────────────────────────────┐
         │  PURPOSE (why role exists)      │
         │  DOMAIN (what role controls)    │
         │  ACCOUNTABILITIES (what it does)│
         └─────────────────────────────────┘
                      │
                      │ energized by
                      ↓
         ┌─────────────────────────────────┐
         │        PEOPLE                   │
         │  (one person can energize       │
         │   multiple roles)               │
         └─────────────────────────────────┘
```

---

## 2. CIRCLES CONTAIN ROLES

```
┌─────────────────────────────────────────────────────────────────┐
│  CIRCLE 2: Organic Agricultural Production                      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CORE ROLES (structural - exist in every circle)        │  │
│  │                                                          │  │
│  │  ┌──────────────┐  ┌──────────────┐                    │  │
│  │  │ Circle Lead  │  │ Circle Rep   │                    │  │
│  │  │ Energized by │  │ Energized by │                    │  │
│  │  │ João         │  │ Maria        │                    │  │
│  │  └──────────────┘  └──────────────┘                    │  │
│  │                                                          │  │
│  │  ┌──────────────┐  ┌──────────────┐                    │  │
│  │  │ Facilitator  │  │ Secretary    │                    │  │
│  │  │ Energized by │  │ Energized by │                    │  │
│  │  │ Ana          │  │ Pedro        │                    │  │
│  │  └──────────────┘  └──────────────┘                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  DEFINED ROLES (created through governance)             │  │
│  │                                                          │  │
│  │  ┌───────────────────┐  ┌────────────────────┐         │  │
│  │  │ BIO Certification │  │ Crop Planning      │         │  │
│  │  │ Coordinator       │  │ Coordinator        │         │  │
│  │  │ Energized by      │  │ Energized by       │         │  │
│  │  │ Pedro             │  │ João               │         │  │
│  │  └───────────────────┘  └────────────────────┘         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

NOTE: João energizes 2 roles (Circle Lead + Crop Planning)
      Pedro energizes 2 roles (Secretary + BIO Coordinator)
      This is NORMAL and HEALTHY!
```

---

## 3. DATABASE RELATIONSHIP MAP

```
                    ┌─────────────┐
                    │  CIRCLES    │
                    └──────┬──────┘
                           │
                           │ contains
                           ↓
                    ┌─────────────┐        ┌─────────────┐
                    │    ROLES    │───────→│   PEOPLE    │
                    └──────┬──────┘ energized by
                           │
                 ┌─────────┴─────────┐
                 │                   │
                 ↓                   ↓
         controls              holds
                 │                   │
         ┌───────┴────────┐  ┌──────┴──────┐
         │ DOMAIN         │  │ ACCOUNTA-   │
         │ ELEMENTS       │  │ BILITIES    │
         └────────┬───────┘  └─────────────┘
                  │
                  ↓ constrained by
         ┌────────────────┐
         │   POLICIES     │
         └────────────────┘
```

---

## 4. DOUBLE-LINKING PRINCIPLE

```
         ┌──────────────────────┐
         │  GENERAL CIRCLE      │
         │                      │
         │  Members:            │
         │  • Circle Lead       │◄─────┐
         │  • Circle 2 Rep ──┐  │      │
         │  • Circle 1 Rep   │  │      │ DOWN: Circle Lead
         │  • Circle 3 Rep   │  │      │       appointed by
         └───────────────────┼──┘      │       parent
                             │         │
                  UP:        │         │
                  Circle Rep │         │
                  elected    │         │
                             │         │
         ┌──────────────────┼─────────┼────┐
         │  CIRCLE 2        ↓         │    │
         │                           ↓     │
         │  Members:                      │
         │  • Circle Lead ←───────────────┘
         │  • Circle Rep ─────────────────┐
         │  • Facilitator                 │
         │  • Secretary                   │
         └────────────────────────────────┘
```

---

## 5. ONE PERSON, MULTIPLE ROLES

```
                        JOÃO (Person)
                          │
                ┌─────────┴─────────┐
                │                   │
        energizes               energizes
                │                   │
                ↓                   ↓
    ┌───────────────────┐   ┌──────────────────┐
    │ Circle 2          │   │ Crop Planning    │
    │ Circle Lead       │   │ Coordinator      │
    │                   │   │                  │
    │ Domain:           │   │ Domain:          │
    │ • Role assignments│   │ • Crop Plan      │
    │                   │   │                  │
    │ Accountabilities: │   │ Accountabilities:│
    │ • Assigning roles │   │ • Planning crop  │
    │ • Allocating      │   │   rotations      │
    │   resources       │   │                  │
    └───────────────────┘   └──────────────────┘

WHY THIS IS GOOD:
• Clear what João does in each role
• Separate authority for each role
• Can delegate one role without the other
• Makes governance evolution easier
```

---

## SUMMARY: KEY PRINCIPLES

1. **ROLES are the fundamental unit** (not people, not circles)
2. **PEOPLE energize ROLES** (one person can energize many roles)
3. **CIRCLES contain ROLES** (circles are special roles)
4. **ROLES control DOMAIN** (specific resources)
5. **ROLES hold ACCOUNTABILITIES** (ongoing work)
6. **POLICIES constrain DOMAIN** (rules on use)
7. **CORE ROLES are structural** (Circle Lead, Circle Rep, Facilitator, Secretary)
8. **DEFINED ROLES emerge from governance** (created as needed)
9. **DOUBLE-LINKING connects levels** (Circle Lead down, Circle Rep up)

Download full diagrams for complete visual documentation!