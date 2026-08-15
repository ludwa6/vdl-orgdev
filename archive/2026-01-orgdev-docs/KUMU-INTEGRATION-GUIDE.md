See downloaded files for complete guide and Python script.

# Kumu Network Map Integration
Vale da Lama OrgDev - Network Visualization & Automated Sync

## Quick Win: Embed Kumu in Notion (30 minutes)

**Where:** Top of "People & Roles" page

**How:**
1. Go to People & Roles page
2. At top, type `/embed`
3. Paste your Kumu URL: https://kumu.io/walt/vdl-org-6dd4
4. Resize to ~700px height
5. Make full width
6. Add context text above and below

**Why this location:**
✅ Visual overview before diving into details
✅ Complements the Board views below
✅ Answers "How does it all fit together?"
✅ Natural flow: Big picture → Details

## Automate: Notion → Google Sheets → Kumu

### The Challenge

Your Kumu map reads from Google Sheets:
https://docs.google.com/spreadsheets/d/1kStkUic72U7Kn3UjSlr9S45vCb9kULVJABFj2kYPFtM/

You currently update it manually via CSV export/import.

**Goal:** Automate this flow.

### Option 1: Zapier ($20/mo, no coding)

**Flow:**
```
Notion Roles/Circles (updated)
    ↓ (Zapier trigger)
Google Sheets (Elements + Connections updated)
    ↓ (automatic)
Kumu (refreshes map)
```

**Setup:** 2-3 Zaps to sync Roles, Circles, and Connections

### Option 2: Python Script ($0, more control)

**Flow:**
```
Notion API (read Roles/Circles)
    ↓ (Python script)
Google Sheets API (write Elements/Connections)
    ↓ (automatic)
Kumu (refreshes map)
```

**Provided:** Complete Python script ready to use

**Run on:** Mac Mini (cron every 6 hours)

### Recommendation for You

**Start:** Continue manual CSV (works fine for now)

**Upgrade to:** Python script when ready

**Why Python over Zapier:**
1. You're technical (comfortable with code)
2. You have hosting (Mac Mini)
3. Zero ongoing cost
4. Full control over data transformation
5. Can include Domain Elements, Accountabilities, etc.

## What's Included

1. **Complete guide** - Embedding + automation options
2. **Python script** - Ready-to-use Notion → Google Sheets sync
3. **Setup instructions** - Notion API, Google credentials
4. **Customization examples** - Add Domain, Accountabilities

## Next Steps

**Today:** Embed Kumu in Notion (30 min)
**This week:** Continue manual CSV
**Next week:** Set up Python automation (2-3 hours)
**Week 3:** Enjoy always-current network map! 🎉

Download the complete guide and Python script!