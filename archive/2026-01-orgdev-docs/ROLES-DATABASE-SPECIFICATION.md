# Roles Database - Complete Specification
Vale da Lama OrgDev - Holacracy v5.0

**Critical:** Roles are the fundamental building block of Holacracy. Circles contain Roles. People energize Roles.

See the downloaded file for complete specification including:
- All database properties with detailed configurations
- Core Roles definitions (Circle Lead, Circle Rep, Facilitator, Secretary)
- Sample entries for Circle 2 with all role types
- Views to create in Notion
- Implementation tips and common patterns
- Answers to common questions

## Quick Reference: Core Roles (v5.0)

| Role | Appointment | Purpose | Key Accountability |
|------|-------------|---------|-------------------|
| **Circle Lead** | Appointed by parent Circle Lead | Steward the Circle towards its Purpose | Assigning roles, allocating resources |
| **Circle Rep** | Elected by Circle members | Represent the Circle in broader org | Processing tensions to parent circle |
| **Facilitator** | Elected by Circle members | Steward the Governance Process | Facilitating governance meetings |
| **Secretary** | Elected by Circle members | Steward formal records | Maintaining governance records |

## Nomenclature Change (v4.0 → v5.0)

- **Lead Link** → **Circle Lead**
- **Rep Link** → **Circle Rep**
- Facilitator (unchanged)
- Secretary (unchanged)

## Key Database Properties

| Property | Type | Purpose |
|----------|------|----------|
| Name | Title | Role name |
| Purpose | Text | Why role exists |
| Circle | Relation → Circles | Which circle contains this |
| Role Type | Select | Circle Lead, Circle Rep, Facilitator, Secretary, Defined Role |
| Energized By | Person | Who fills this role |
| Status | Select | Active, Vacant, Proposed, Deprecated |
| Domain Elements | Relation → Domain Elements | What role controls |
| Accountabilities | Relation → Accountabilities | What role does |
| Policies | Relation → Policies | Constraints on role |
| Assignment Date | Date | When current person assigned |

## Implementation Pattern

For each Circle created:
1. Create 4 Core Role entries in Roles database
2. Link Core Roles to Circle
3. Assign people to Core Roles (at minimum Circle Lead)
4. Add Defined Roles as governance creates them
5. Link Domain Elements and Accountabilities to appropriate Roles

## Common Patterns

**One Person, Multiple Roles** (Normal and Healthy!):
- João energizes both Circle Lead AND Crop Planning Coordinator
- Pedro energizes both Secretary AND BIO Certification Coordinator

**Vacant Roles** (Normal During Growth):
- Surplus Sales Coordinator is vacant
- Circle Lead temporarily holds those accountabilities

**Role Evolution**:
- Start with Circle Lead doing everything
- Create Defined Roles as complexity increases
- Deprecate roles when no longer needed (don't delete!)

Download the complete specification for full details!