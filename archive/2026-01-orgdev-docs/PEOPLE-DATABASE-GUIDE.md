See downloaded file for complete guide.

# People Database Setup Guide
Vale da Lama OrgDev - Managing People Inside and Outside Workspace

## The Problem

**Notion's Person property limitations:**
❌ Only works for workspace members
❌ Can't add contact info
❌ Tied to Notion billing (seat limits)
❌ Can't track external people or former members

**Your situation:**
- Some people energize roles but aren't workspace members
- Some never will be (contractors, advisors, external)
- Need full contact info for everyone
- Workspace has seat limits

## The Solution: People Database

Create a standalone database that works for everyone.

**Benefits:**
✅ Works for anyone (members or not)
✅ Store full contact info (email, phone, etc.)
✅ Track status (Active, External, Former)
✅ No workspace seat limit
✅ Perfect for Kumu visualization
✅ Can link to multiple roles

## Database Structure

**Core properties:**
- Name (Title) - Full name
- First Name, Last Name (Text)
- Email, Phone (Contact types)
- Workspace Member (Checkbox)
- Notion User (Person) - Links to account if member
- Status (Select: Active, External, Former, Pending)
- Type (Select: Team Member, Contractor, Volunteer, Advisor)
- Start/End Dates
- Roles (Relation → Roles database)
- Primary Circle (Relation → Circles)
- Photo, Bio, Location, Notes

## Key Views

1. **All Active People** - Everyone currently involved
2. **Workspace Members** - Who has Notion access
3. **External People** - Non-members energizing roles
4. **By Circle** - Board view grouped by circle
5. **Former People** - Historical record

## Migration Plan

### Step 1: Create People Database
Use Notion AI prompts (provided in full guide)

### Step 2: Add New Relation to Roles
- Old: Energized By (Person property)
- New: Energized By (Relation to People database)

### Step 3: Migrate Data
- Create person entries
- Link to roles
- Mark workspace membership
- Add contact info

### Step 4: Update Integrations
- Kumu sync script reads from People database
- All visualizations work correctly

## Sample Entries

**Workspace Member:**
- Name: João Silva
- Status: Active
- Type: Team Member
- Workspace Member: ☑
- Notion User: @João Silva
- Roles: Circle Lead, Crop Planning

**External Person:**
- Name: Maria Santos
- Status: External  
- Type: Contractor
- Workspace Member: ☐
- Email: maria@external.com
- Roles: Production Ops

**Former Member:**
- Name: Ana Costa
- Status: Former
- End Date: 2025-11-30
- Workspace Member: ☐
- Roles: (kept for history)

## Integration with Kumu

Kumu sync script automatically:
1. Reads People database (not Person property)
2. Adds all people as Elements
3. Creates "energizes" connections
4. Works for workspace members AND external people

## Quick Start

**Today (1 hour):**
1. Use Notion AI to create People database
2. Add 3-5 sample entries
3. Test relations to Roles

**This week:**
1. Migrate existing person assignments
2. Add all external people
3. Update contact info

**Next week:**
1. Update Kumu sync to use People database
2. Train team on adding new people

This is the professional way to handle people in organizational systems!

Download complete guide for:
- Full database specifications
- Notion AI prompts
- Migration script (Python)
- Integration updates
- Troubleshooting tips