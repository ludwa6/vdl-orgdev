# Notion Database Specifications
Vale da Lama OrgDev Governance System

Complete property lists for each database with types, options, and relationships.

---

## DATABASE 1: CIRCLES

**Purpose:** Track all circles/roles in the organization

### Properties

| Property Name | Property Type | Configuration | Notes |
|--------------|---------------|---------------|-------|
| **Name** | Title | - | Primary identifier (e.g., "Circle 2: Organic Agricultural Production") |
| **Purpose** | Text | - | Single clear statement of why the circle exists |
| **Parent Circle** | Relation | → Circles (single) | Which circle contains this one |
| **Sub-Circles** | Relation | → Circles (multiple) | Which circles are contained within this one |
| **Lead Link** | Person | - | Current Lead Link |
| **Status** | Select | Options: Active, Planning, Proposed, Archived | Current operational status |
| **Level** | Select | Options: General, Circle, Sub-Circle, Role | Hierarchy level |
| **Domain Count** | Rollup | From Domain Elements → Count | How many domain elements this circle controls |
| **Accountability Count** | Rollup | From Accountabilities → Count | How many accountabilities this circle has |
| **Policy Count** | Rollup | From Policies → Count | How many policies govern this circle |
| **Last Updated** | Date | - | Last modification date |
| **Created Date** | Created time | - | Auto-populated |
| **Notes** | Text | - | Optional implementation notes |

### Views to Create

**1. Organizational Hierarchy**
- Type: Board
- Group by: Parent Circle
- Filter: Status = Active
- Sort: Name (A→Z)

**2. Active Circles Only**
- Type: Table
- Filter: Status = Active
- Show: Name, Purpose, Lead Link, Domain Count, Accountability Count

**3. All Circles (Archive View)**
- Type: Table
- No filters
- Show: All properties
- Sort: Status, then Name

**4. Circle Details Template**
- Type: Page
- Show: Purpose, all related Domain Elements, Accountabilities, Policies
- For drilling down into a specific circle

---

## DATABASE 2: DOMAIN ELEMENTS

**Purpose:** Track specific resources and authorities controlled by circles

### Properties

| Property Name | Property Type | Configuration | Notes |
|--------------|---------------|---------------|-------|
| **Name** | Title | - | Name of the domain element (e.g., "Crop Plan", "Circle Budget") |
| **Description** | Text | - | What this domain element is and why it matters |
| **Controlling Circle** | Relation | → Circles (single) | Which circle has authority over this |
| **Type** | Select | Options: Resource, Decision Authority, Asset, Process, Budget, Data, Relationship | What kind of domain element |
| **Policies Applied** | Relation | → Policies (multiple) | Which policies constrain use of this element |
| **Shared With** | Relation | → Circles (multiple) | Other circles that need access (optional) |
| **Status** | Select | Options: Active, Proposed, Deprecated | Current status |
| **Tangibility** | Select | Options: Physical, Digital, Conceptual, Financial | Nature of the resource |
| **Last Updated** | Date | - | Last modification |
| **Notes** | Text | - | Additional context |

### Views to Create

**1. By Circle**
- Type: Board
- Group by: Controlling Circle
- Filter: Status = Active
- Sort: Type, then Name

**2. By Type**
- Type: Table
- Group by: Type
- Filter: Status = Active
- Sort: Controlling Circle, then Name

**3. With Policies**
- Type: Table
- Filter: Policies Applied > 0
- Show: Name, Controlling Circle, Policies Applied

**4. Physical Resources**
- Type: Gallery
- Filter: Tangibility = Physical, Status = Active
- Show: Name, Controlling Circle, Description

---

## DATABASE 3: ACCOUNTABILITIES

**Purpose:** Track ongoing activities each circle is responsible for

### Properties

| Property Name | Property Type | Configuration | Notes |
|--------------|---------------|---------------|-------|
| **Name** | Title | - | "-ing" verb phrase (e.g., "Planning annual crop rotations") |
| **Description** | Text | - | Clarifying details on what this involves |
| **Circle** | Relation | → Circles (single) | Which circle holds this accountability |
| **Related Domain** | Relation | → Domain Elements (multiple) | Which domain elements are used |
| **Status** | Select | Options: Active, Proposed, Evolving, Deprecated, Transferred | Current status |
| **Frequency** | Select | Options: Daily, Weekly, Monthly, Quarterly, Annually, Ongoing, As-Needed | How often performed |
| **Complexity** | Select | Options: Simple, Moderate, Complex | Rough complexity indicator |
| **Dependencies** | Relation | → Circles (multiple) | Other circles this accountability depends on |
| **Created Date** | Created time | - | Auto-populated |
| **Last Updated** | Date | - | Last modification |
| **Notes** | Text | - | Implementation details |

### Views to Create

**1. By Circle**
- Type: Board
- Group by: Circle
- Filter: Status = Active
- Sort: Frequency, then Name

**2. Active Work**
- Type: Table
- Filter: Status = Active
- Show: Name, Circle, Frequency, Related Domain
- Sort: Circle

**3. High Frequency Activities**
- Type: Table
- Filter: Frequency IN [Daily, Weekly], Status = Active
- Group by: Circle

**4. Evolution Tracker**
- Type: Timeline
- Date field: Last Updated
- Filter: Status IN [Evolving, Proposed, Transferred]
- Show: Name, Circle, Status

---

## DATABASE 4: POLICIES

**Purpose:** Track constraints and rules on domain use

### Properties

| Property Name | Property Type | Configuration | Notes |
|--------------|---------------|---------------|-------|
| **Name** | Title | - | Short policy name (e.g., "Internal Priority") |
| **Policy Text** | Text | Multi-line | The actual constraint or rule |
| **Applies To** | Relation | → Domain Elements (multiple) | Which domain elements this constrains |
| **Created By** | Relation | → Circles (single) | Circle that created this policy |
| **Affects** | Relation | → Circles (multiple) | Circles that must follow this policy |
| **Scope** | Select | Options: Circle-Internal, Cross-Circle, Organization-Wide | Who this policy applies to |
| **Status** | Select | Options: Active, Proposed, Under Review, Deprecated | Current status |
| **Enforcement** | Select | Options: Mandatory, Guideline, Best Practice | How strictly enforced |
| **Category** | Select | Options: Resource Allocation, Quality Standard, Coordination, Safety, Financial, Compliance | Type of policy |
| **Rationale** | Text | - | Why this policy exists (optional) |
| **Created Date** | Created time | - | Auto-populated |
| **Review Date** | Date | - | When to review this policy |
| **Last Updated** | Date | - | Last modification |

### Views to Create

**1. Active Policies**
- Type: Table
- Filter: Status = Active
- Show: Name, Created By, Affects, Scope, Category
- Sort: Scope, then Name

**2. By Domain Element**
- Type: Board
- Group by: Applies To
- Filter: Status = Active
- Sort: Created By

**3. Cross-Circle Policies**
- Type: Table
- Filter: Scope IN [Cross-Circle, Organization-Wide], Status = Active
- Show: Name, Policy Text, Created By, Affects

**4. Policies Needing Review**
- Type: Table
- Filter: Review Date < Today OR Status = Under Review
- Show: Name, Review Date, Created By, Status

**5. By Category**
- Type: Board
- Group by: Category
- Filter: Status = Active

---

## DATABASE 5: TENSIONS

**Purpose:** Track issues, opportunities, and tensions being processed

### Properties

| Property Name | Property Type | Configuration | Notes |
|--------------|---------------|---------------|-------|
| **Title** | Title | - | Brief description of the tension |
| **Description** | Text | Multi-line | Full description of the issue or opportunity |
| **Raised By** | Person | - | Who identified this tension |
| **Related Circle** | Relation | → Circles (single) | Primary circle where tension exists |
| **Affected Circles** | Relation | → Circles (multiple) | Other circles impacted |
| **Type** | Select | Options: Role Clarity, Domain Boundary, Resource Allocation, Process Issue, Strategic, Interpersonal, External | Category |
| **Status** | Select | Options: Open, In Process, Resolved, Deferred, Closed | Current status |
| **Priority** | Select | Options: Critical, High, Medium, Low | Urgency level |
| **Resolution** | Text | Multi-line | How this was addressed (when resolved) |
| **Outcome Type** | Select | Options: Policy Created, Accountability Added, Domain Clarified, Role Created, No Action Needed | What resulted |
| **Related Policies** | Relation | → Policies (multiple) | Policies created or modified |
| **Date Raised** | Date | - | When tension was identified |
| **Date Resolved** | Date | - | When tension was resolved |
| **Next Action** | Text | - | What needs to happen next |
| **Meeting** | Text | - | Governance meeting where processed |

### Views to Create

**1. Open Tensions**
- Type: Board
- Group by: Status
- Filter: Status IN [Open, In Process]
- Sort: Priority (High→Low), then Date Raised

**2. By Circle**
- Type: Table
- Group by: Related Circle
- Show: Title, Raised By, Status, Priority, Date Raised

**3. High Priority**
- Type: Table
- Filter: Priority IN [Critical, High], Status != Closed
- Sort: Priority, then Date Raised

**4. Recently Resolved**
- Type: Gallery
- Filter: Status = Resolved, Date Resolved > 30 days ago
- Show: Title, Resolution, Outcome Type

**5. Tension Pipeline**
- Type: Timeline
- Date field: Date Raised
- Filter: Status != Closed
- Group by: Status

---

## DATABASE 6: MEETINGS (Optional but Recommended)

**Purpose:** Track governance meetings and decisions

### Properties

| Property Name | Property Type | Configuration | Notes |
|--------------|---------------|---------------|-------|
| **Title** | Title | - | Meeting name (e.g., "Circle 2 Governance - Jan 2026") |
| **Circle** | Relation | → Circles (single) | Which circle held this meeting |
| **Date** | Date | - | Meeting date |
| **Facilitator** | Person | - | Who facilitated |
| **Secretary** | Person | - | Who took notes |
| **Attendees** | Person | Multiple | Who attended |
| **Tensions Addressed** | Relation | → Tensions (multiple) | Which tensions were processed |
| **Policies Created** | Relation | → Policies (multiple) | New policies from this meeting |
| **Roles Modified** | Relation | → Circles (multiple) | Roles/circles changed |
| **Meeting Notes** | Text | Multi-line | Full notes or link to document |
| **Next Meeting** | Date | - | When next meeting scheduled |
| **Status** | Select | Options: Scheduled, Completed, Cancelled | Meeting status |

### Views to Create

**1. Upcoming Meetings**
- Type: Calendar
- Date field: Date
- Filter: Status = Scheduled, Date > Today

**2. By Circle**
- Type: Table
- Group by: Circle
- Filter: Status = Completed
- Sort: Date (newest first)

**3. Meeting Archive**
- Type: Table
- Show: All properties
- Sort: Date (newest first)

---

## IMPLEMENTATION SEQUENCE

### Phase 1: Core Structure (Day 1)
1. Create **Circles** database with all properties
2. Enter 4 circles (General, Circle 1, Circle 2, Circle 3)
3. Set up Parent/Sub-Circle relations
4. Create "Organizational Hierarchy" view

### Phase 2: Domain & Accountabilities (Day 2)
1. Create **Domain Elements** database
2. Create **Accountabilities** database
3. Enter all domain elements from circle definitions
4. Enter all accountabilities from circle definitions
5. Link to circles

### Phase 3: Policies (Day 3)
1. Create **Policies** database
2. Enter all policies from circle definitions
3. Link to domain elements and circles
4. Create policy views

### Phase 4: Tensions & Meetings (Day 4)
1. Create **Tensions** database
2. Create **Meetings** database
3. Set up process for logging new tensions
4. Test with first governance meeting

### Phase 5: Portal & Refinement (Day 5)
1. Create OrgDev Portal page
2. Embed key views
3. Test navigation and relationships
4. Gather feedback from team
5. Refine based on actual use

---

## TIPS FOR NOTION IMPLEMENTATION

### Relation Best Practices
- Always create relations bidirectionally
- Use rollups to show counts (e.g., "How many policies affect this circle?")
- Name relations clearly (not just "Related Items")

### View Strategy
- Start with fewer views, add more as needed
- Name views by use case, not by filter settings
- Keep default view simple and clean

### Data Entry
- Enter circles first (foundation)
- Then domain elements (what circles control)
- Then accountabilities (what circles do)
- Finally policies (constraints on how)

### Testing
- Enter one complete circle with all relationships
- Verify all views show data correctly
- Test navigation between related items
- Then replicate for other circles

### Maintenance
- Review and update quarterly
- Archive deprecated items (don't delete)
- Keep purposes and accountabilities current
- Let policies accumulate naturally (don't force them)