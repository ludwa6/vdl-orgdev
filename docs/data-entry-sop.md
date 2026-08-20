# VdL OrgDev — Standard Operating Procedure: Data Entry Checklists

**Purpose:** Step-by-step checklists for all common data administration tasks in the OrgDev Notion workspace.

**Last Updated:** 2026-02-09 (Sonnet 4.5)

---

## Safety Reminder: The Table View Deletion Trap

⚠️ **CRITICAL:** In Notion table view, clicking on a relation chip and pressing Delete removes THE ENTIRE ROW, not just the relation entry.

**Safe editing methods:**
1. ✅ Open the record page first, then edit relations (× buttons appear)
2. ✅ Edit from the other side of the bidirectional relation (often safer)
3. ✅ Use Claude/API for bulk changes

**Never:** Click relation chips in table view and press Delete/Backspace.

---

## Table of Contents

1. [Onboard a New Person](#1-onboard-a-new-person)
2. [Create a New Role](#2-create-a-new-role)
3. [Create a New Circle](#3-create-a-new-circle)
4. [Assign Person to Role](#4-assign-person-to-role)
5. [Unassign Person from Role](#5-unassign-person-from-role)
6. [Reassign Role to Different Person](#6-reassign-role-to-different-person)
7. [Offboard a Person](#7-offboard-a-person)
8. [Restructure Circles (Move Sub-circle)](#8-restructure-circles-move-sub-circle)
9. [Create an Accountability](#9-create-an-accountability)
10. [Create a Domain](#10-create-a-domain)
11. [Create a Policy](#11-create-a-policy)

---

## 1. Onboard a New Person

**When:** New team member, contractor, or volunteer joins VdL Farm.

### Checklist

- [ ] **Create Person record** in People database
- [ ] **Set Name** (full display name)
- [ ] **Set First Name** and **Last Name**
- [ ] **Set Person Status** → Active
- [ ] **Set Type** → Team Member / Contractor / Volunteer / etc.
- [ ] **Set Primary Circle** → the circle they primarily work in
- [ ] **Add Circle Memberships** → all circles they participate in
  - ⚠️ This is separate from Primary Circle
  - ⚠️ This will NOT auto-populate when you assign roles later
- [ ] **Set Start Date** (if tracking)
- [ ] **Fill optional fields:** Email, Phone, Bio, Photo, etc.
- [ ] **Assign roles** (see [#4: Assign Person to Role](#4-assign-person-to-role))

### What Cascades Automatically
- None (Person records are standalone until roles assigned)

### What Does NOT Cascade (Manual)
- Circle Memberships must be set explicitly
- Roles must be assigned separately (next procedure)

---

## 2. Create a New Role

**When:** Governance meeting creates a new role in a circle.

### Checklist

- [ ] **Create Role record** in Roles database
- [ ] **Set Name** → descriptive role name (e.g., "Restaurant Manager")
- [ ] **Set Role Type** → one of:
  - Circle Lead
  - Circle Rep
  - Secretary
  - Facilitator
  - Defined Role (default for most roles)
- [ ] **Set Circle** → which circle contains this role
- [ ] **Set Purpose** → the role's reason for existing (triggers "Proposed" status)
- [ ] **Add Accountabilities** (see [#9: Create an Accountability](#9-create-an-accountability))
  - Create new Accountability records
  - Link them to this Role
  - **CRITICAL:** Set Owning Circle on each Accountability (see below)
- [ ] **Add Domains** (see [#10: Create a Domain](#10-create-a-domain))
  - Create new Domain records
  - Link them to this Role
- [ ] **Optional:** Set Notes, Assignment Date (if assigning person immediately)
- [ ] **Assign person** (if ready — see [#4: Assign Person to Role](#4-assign-person-to-role))

### What Cascades Automatically
- Role Status formula computes:
  - "Vacant" (no Purpose, no person)
  - "Proposed" (has Purpose, no person)
  - "Active" (has person)

### What Does NOT Cascade (Manual)
- Accountabilities must be created separately and linked
- Domains must be created separately and linked
- If this is a Circle Lead/Rep/Secretary/Facilitator, you must also link it from the Circle record (see [#3: Create a Circle](#3-create-a-new-circle))

---

## 3. Create a New Circle

**When:** Governance creates a new sub-circle within an existing circle.

### Checklist

- [ ] **Create Circle record** in Circles database
- [ ] **Set Name** → circle name (e.g., "Restaurant")
- [ ] **Set Purpose** → why this circle exists
- [ ] **Set Status** → Active
- [ ] **Set Super-circle** → the parent circle containing this one
  - ⚠️ This auto-populates the parent's Sub-circles field
- [ ] **Set Level** (if tracking hierarchy depth)
- [ ] **Create structural roles** (see [#2: Create a New Role](#2-create-a-new-role)):
  - Create "circleLead: [Circle Name]" role with Role Type = Circle Lead
  - Create "circleRep: [Circle Name]" role with Role Type = Circle Rep
  - Create "Secretary: [Circle Name]" role with Role Type = Secretary
  - Create "Facilitator: [Circle Name]" role with Role Type = Facilitator
- [ ] **Link structural roles to circle:**
  - Set Circle.Circle Lead → the Circle Lead role record
  - Set Circle.Circle Rep → the Circle Rep role record
  - Set Circle.Secretary → the Secretary role record
  - Set Circle.Facilitator → the Facilitator role record
  - ⚠️ These point to ROLES, not PEOPLE
- [ ] **Assign people to structural roles** (see [#4: Assign Person to Role](#4-assign-person-to-role))
- [ ] **Add Circle Members** → people who participate in this circle
  - ⚠️ This does NOT auto-populate from role assignments
- [ ] **Add Circle Accountabilities** (if any — see [#9: Create an Accountability](#9-create-an-accountability))
  - These are accountabilities held directly by the circle (Circle Lead implicitly holds them)
  - **CRITICAL:** Set Owning Circle = this circle, leave Role empty
- [ ] **Add Circle Domains** (see [#10: Create a Domain](#10-create-a-domain))
- [ ] **Add Circle Policies** (see [#11: Create a Policy](#11-create-a-policy))

### What Cascades Automatically
- Parent circle's "Sub-circles" auto-populates
- Circle appears on OrgMap after refresh

### What Does NOT Cascade (Manual)
- Structural roles must be created and linked manually
- People must be assigned to roles separately
- Circle Memberships must be set explicitly
- Circle-level Accountabilities/Domains/Policies must be created separately

---

## 4. Assign Person to Role

**When:** A person is elected/selected to energize a role.

### Checklist

- [ ] **Open the Role record** (page view, not table view)
- [ ] **Edit "Energized By" field** → add the person
  - ⚠️ Alternative: edit from Person side ("Energizes Roles") — same effect
- [ ] **Set Assignment Date** (if tracking) → manual entry, not auto-set
- [ ] **Verify Circle Membership:**
  - Check if person is in Circle.Circle Members for the role's circle
  - If not, add them (open Circle record → edit "Circle Members")
- [ ] **Optional:** Update legacy "People" field on role (during transition period only)

### What Cascades Automatically
- Role Status formula updates to "Active"
- Person's "Energizes Roles" auto-populates (if you edited from Role side)
- Role's "Energized By" auto-populates (if you edited from Person side)
- OrgMap shows connection (if person is Circle Lead or Circle Rep)

### What Does NOT Cascade (Manual)
- Circle Memberships do NOT auto-update — add person to circle manually
- Assignment Date is NOT auto-set
- Legacy "People" field (if you're still maintaining it during transition)

---

## 5. Unassign Person from Role

**When:** A person steps down from a role or is re-elected out.

### Checklist

- [ ] **Open the Role record** (page view, NOT table view)
- [ ] **Edit "Energized By" field** → click × next to the person's name
  - ⚠️ DO NOT click the relation chip in table view and press Delete (deletes entire role!)
  - ⚠️ Alternative: edit from Person side ("Energizes Roles") — same effect
- [ ] **Check Circle Membership:**
  - If person holds other roles in this circle, leave them in Circle Members
  - If this was their only role in the circle, consider removing from Circle Members
- [ ] **Optional:** Clear Assignment Date
- [ ] **Optional:** Update legacy "People" field on role (during transition period only)

### What Cascades Automatically
- Role Status formula updates to "Proposed" (if Purpose exists) or "Vacant" (no Purpose)
- Person's "Energizes Roles" auto-removes role (if you edited from Role side)
- Role's "Energized By" auto-clears (if you edited from Person side)
- OrgMap removes connection

### What Does NOT Cascade (Manual)
- Circle Memberships remain unless you remove them
- Assignment Date is not auto-cleared
- Legacy "People" field (if maintaining)

---

## 6. Reassign Role to Different Person

**When:** Role transitions from one person to another.

### Checklist

- [ ] **Open the Role record** (page view)
- [ ] **Edit "Energized By" field:**
  - Click × next to old person's name
  - Add new person
  - ⚠️ Alternative: do both steps from Person side
- [ ] **Set Assignment Date** → date new person took over
- [ ] **Verify new person's Circle Membership:**
  - Add to Circle.Circle Members if not already there
- [ ] **Check old person's Circle Membership:**
  - If no other roles in this circle, consider removing from Circle Members
- [ ] **Optional:** Update legacy "People" field on role

### What Cascades Automatically
- Role Status stays "Active" (person → person transition)
- Old person's "Energizes Roles" auto-removes this role
- New person's "Energizes Roles" auto-adds this role
- OrgMap updates connections

### What Does NOT Cascade (Manual)
- Circle Memberships for both people
- Assignment Date update
- Legacy "People" field

---

## 7. Offboard a Person

**When:** Team member, contractor, or volunteer leaves VdL Farm.

### Checklist

- [ ] **Open the Person record**
- [ ] **Remove all roles:**
  - Edit "Energizes Roles" → remove all entries (click × on each)
  - ⚠️ This cascades to all Role records automatically
- [ ] **Remove all Circle Memberships:**
  - Edit "Circle Memberships" → remove all entries
  - ⚠️ This cascades to all Circle records automatically
- [ ] **Set Person Status** → Former
- [ ] **Set End Date** (if tracking)
- [ ] **Optional:** Archive the record instead of deleting
  - ⚠️ Never delete Person records — set to Former and keep for history

### What Cascades Automatically
- All roles this person energized flip to "Proposed" or "Vacant"
- Person disappears from all Circle.Circle Members lists
- Person disappears from all Role.Energized By fields
- OrgMap removes all person connections

### What Does NOT Cascade (Manual)
- Person Status must be set to "Former"
- End Date is not auto-set
- The Person record itself is NOT auto-archived

### Cleanup to Do Later
- [ ] Reassign the person's former roles to new people (see [#4: Assign Person to Role](#4-assign-person-to-role))

---

## 8. Restructure Circles (Move Sub-circle)

**When:** Governance decides to reorganize circle hierarchy (e.g., move Restaurant from Casa Ops to Farm Ops).

### Checklist

- [ ] **Open the Sub-circle record** (the circle being moved)
- [ ] **Edit "Super-circle" field:**
  - Remove old parent circle
  - Add new parent circle
- [ ] **Verify downstream impacts:**
  - Check if any Policies "Affect" this circle and need updating
  - Check if Circle Members still make sense in new hierarchy
  - Check if Circle Domains need review
- [ ] **Update related Policies** (if any cross-circle policies affected)

### What Cascades Automatically
- Old parent's "Sub-circles" auto-removes this circle
- New parent's "Sub-circles" auto-adds this circle
- OrgMap hierarchy updates after refresh

### What Does NOT Cascade (Manual)
- Circle Members remain unchanged (may need review)
- Roles within the circle remain unchanged
- Accountabilities and Domains remain unchanged
- Policies may need manual review/update

---

## 9. Create an Accountability

**When:** Governance assigns a new accountability to a role or circle.

### Checklist

- [ ] **Create Accountability record** in Accountabilities database
- [ ] **Set Name** → brief accountability statement (e.g., "Maintain kitchen cleanliness")
- [ ] **Set Owning Circle** → **CRITICAL: ALWAYS SET THIS MANUALLY**
  - This is the circle where the accountability originates
  - Independent of which role (if any) holds it
  - **Rule:** Owning Circle must ALWAYS be set, even if Role field is empty
- [ ] **Set Role** (if assigning to specific role):
  - Link to the role that holds this accountability
  - Leave empty if accountability is held at Circle level (Circle Lead holds implicitly)
  - **Rule:** Role is optional; Owning Circle is mandatory
- [ ] **Set Description** (if needed for clarity)
- [ ] **Set Frequency** (if applicable): Daily / Weekly / Monthly / Quarterly / Annual / As Needed
- [ ] **Set Complexity** (if tracking): Simple / Medium / Complex
- [ ] **Set Status** (if tracking): Active / Inactive / Pending
- [ ] **Optional:** Set Dependencies (if accountability depends on other circles)

### What Cascades Automatically
- Circle's "Accountabilities" field auto-populates with this record
- Role's "Accountabilities" field auto-populates (if Role was set)

### What Does NOT Cascade (Manual)
- **Owning Circle does NOT auto-populate** from Role field — must be set manually
- Description, Frequency, Complexity, Status are all manual
- Dependencies must be set explicitly

### Accountability Lifecycle Scenarios

**Scenario A: Circle-level accountability (Circle Lead holds implicitly)**
- Set Owning Circle = the circle
- Leave Role empty
- Example: "Maintain Circle's governance records" → Restaurant circle, no specific role

**Scenario B: Role-specific accountability within a circle**
- Set Owning Circle = the circle
- Set Role = the specific role
- Example: "Manage kitchen inventory" → Restaurant circle, Restaurant Manager role

**Scenario C: Moving accountability to different circle during restructuring**
- Change Owning Circle to new circle
- Update Role if needed (may stay same, may change, may become empty)
- Example: Moving "Coordinate with suppliers" from Restaurant → Farm Ops

---

## 10. Create a Domain

**When:** Governance grants control of a domain to a role or circle.

### Checklist

- [ ] **Create Domain record** in Domains database
- [ ] **Set Name** → the domain being controlled (e.g., "Kitchen equipment purchasing")
- [ ] **Set Circle** → which circle grants this domain
- [ ] **Set Roles** → which role(s) control this domain (can be multiple)
  - Leave empty if domain is held at Circle level
- [ ] **Set Description** (if needed for clarity)
- [ ] **Optional:** Set Status, Notes

### What Cascades Automatically
- Circle's "Domains" field auto-populates
- Role's "Domains" field auto-populates (if Role was set)

### What Does NOT Cascade (Manual)
- Description, Status, Notes are all manual
- Circle field must be set explicitly

---

## 11. Create a Policy

**When:** Governance creates a new policy to govern a circle or cross-circle interaction.

### Checklist

- [ ] **Create Policy record** in Policies database
- [ ] **Set Name** → policy title (e.g., "Kitchen Shift Handoff Protocol")
- [ ] **Set Description** → full policy text
- [ ] **Set Scope:**
  - "Circle-specific" → applies only to one circle
  - "Cross-Circle" → applies across multiple circles
- [ ] **Set Affects** → which circle(s) this policy affects
  - Can select multiple circles (dual_property relation)
  - For cross-circle policies, select all affected circles
- [ ] **Set Created By** → which circle created this policy
- [ ] **Optional:** Set Related Roles (which roles this policy particularly affects)
- [ ] **Optional:** Set Status, Notes

### What Cascades Automatically
- All affected Circles' "Affecting Policies" field auto-populates
- Related Roles' "Policies" field auto-populates (if set)

### What Does NOT Cascade (Manual)
- Scope must be set manually
- Affects must be set explicitly (can select multiple circles)
- Created By must be set explicitly

### Policy Scenarios

**Scenario A: Single-circle policy**
- Set Scope = "Circle-specific"
- Set Affects = one circle (e.g., Restaurant)
- Example: "Restaurant Closing Checklist"

**Scenario B: Cross-circle interface policy**
- Set Scope = "Cross-Circle"
- Set Affects = multiple circles (e.g., Restaurant + Farm Ops)
- Example: "Farm-to-Table Coordination Protocol"

---

## Appendix: Quick Reference — What Cascades vs. What Doesn't

| Action | Auto-Cascades | Must Do Manually |
|--------|--------------|------------------|
| Create Person | None | Circle Memberships, Role assignments |
| Create Role | Role Status formula | Accountabilities (+ set Owning Circle!), Domains, linking from Circle if structural role |
| Create Circle | Parent's Sub-circles | Structural roles, Circle Members, Circle-level Accountabilities (+ Owning Circle!) |
| Assign Person → Role | Role Status, reverse relation | Circle Membership, Assignment Date |
| Unassign Person from Role | Role Status, reverse relation | Circle Membership cleanup (if needed) |
| Create Accountability | Circle/Role reverse relations | **Owning Circle (ALWAYS!)**, Description, Frequency, Complexity |
| Create Domain | Circle/Role reverse relations | Description, Status |
| Create Policy | Circle/Role reverse relations | Scope, Affects (multiple circles), Created By |
| Offboard Person | All role/circle removals cascade | Person Status → Former, End Date |
| Move Sub-circle | Parent circle Sub-circles fields | Review Circle Members, Policies, Domains |

---

## Critical Reminders

1. **Owning Circle Rule:** ALWAYS set Owning Circle on Accountabilities manually. It does NOT auto-populate from Role.

2. **Table View Deletion Trap:** Never click relation chips in table view and press Delete. Always open record first.

3. **Bidirectional Relations:** Editing from either side has the same effect (Person.Energizes Roles ↔ Role.Energized By).

4. **Circle Membership vs. Role Assignment:** These are separate. Assigning a role does NOT auto-add person to Circle Members.

5. **Structural Roles:** Circle Lead/Rep/Secretary/Facilitator roles must be created AND linked from both Circle and Role sides.

---

*Document created: 2026-02-09 by Sonnet 4.5*  
*Implements US-2.1: Standard Operating Procedure for data entry*  
*Based on: SESSION-HANDOFF.md, orgdev-schema-context.md, orgdev-data-admin-guide.md*
