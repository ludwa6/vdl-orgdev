#!/usr/bin/env node
/**
 * OrgDev Data Integrity Validator (US-2.3)
 * 
 * Checks for inconsistencies across the OrgDev Notion databases:
 * - Circles, Roles, People, Accountabilities, Domains, Policies
 * 
 * Usage:
 *   NOTION_API_KEY=secret_xxx node orgdev-validate.js
 * 
 * Output: Validation report with all found issues and suggested fixes
 */

const https = require('https');

// Database IDs (data_source_id format for API queries)
const DB_IDS = {
  circles: '2de36f74-3758-8122-ac4a-000b520202bf',
  roles: '2de36f74-3758-8123-8fda-000b5d5af434',
  people: 'c2edc051-62cd-49cb-9805-38fa64d83a4f',
  accountabilities: '2eb36f74-3758-8086-8cc9-000bb45bfa91',
  domains: '2eb36f74-3758-80b9-a49d-000b3a7a87ef',
  policies: '2de36f74-3758-8118-8a20-000b3d60d38e'
};

// Property IDs we care about (from schema documentation)
const PROPS = {
  // People DB
  people_energizesRoles: 'Energizes Roles',
  people_circleMemberships: 'Circle Memberships',
  people_personStatus: 'Person Status',
  people_name: 'Name',
  people_status1: 'Status 1',
  
  // Roles DB
  roles_energizedBy: 'Energized By',
  roles_circle: 'Circle',
  roles_roleType: 'Role Type',
  roles_roleStatus: 'Role Status',
  roles_name: 'Name',
  roles_purpose: 'Purpose',
  
  // Circles DB
  circles_circleLead: 'Circle Lead',
  circles_circleRep: 'Circle Rep',
  circles_secretary: 'Secretary',
  circles_facilitator: 'Facilitator',
  circles_circleMembers: 'Circle Members',
  circles_name: 'Name',
  circles_status: 'Status',
  circles_owningCircle: 'Owning Circle'
};

const API_KEY = process.env.NOTION_API_KEY;
if (!API_KEY) {
  console.error('Error: NOTION_API_KEY environment variable not set');
  process.exit(1);
}

const NOTION_VERSION = '2022-06-28';

// Notion API helper
function notionRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Query all pages from a database
async function queryDatabase(databaseId) {
  const results = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const response = await notionRequest(
      'POST',
      `/v1/databases/${databaseId}/query`,
      { start_cursor: startCursor, page_size: 100 }
    );
    
    results.push(...response.results);
    hasMore = response.has_more;
    startCursor = response.next_cursor;
  }

  return results;
}

// Extract relation IDs from a property
function getRelationIds(page, propName) {
  const prop = page.properties[propName];
  if (!prop || prop.type !== 'relation') return [];
  return prop.relation.map(r => r.id);
}

// Extract select value
function getSelectValue(page, propName) {
  const prop = page.properties[propName];
  if (!prop || prop.type !== 'select') return null;
  return prop.select ? prop.select.name : null;
}

// Extract formula value (text result)
function getFormulaValue(page, propName) {
  const prop = page.properties[propName];
  if (!prop || prop.type !== 'formula') return null;
  if (prop.formula.type === 'string') return prop.formula.string;
  return null;
}

// Extract title
function getTitle(page, propName = 'Name') {
  const prop = page.properties[propName];
  if (!prop) return '(Untitled)';
  
  if (prop.type === 'title') {
    return prop.title.length > 0 ? prop.title[0].plain_text : '(Untitled)';
  }
  return '(Unknown)';
}

// Get page URL
function getPageUrl(pageId) {
  return `https://notion.so/${pageId.replace(/-/g, '')}`;
}

// Validation checks
class ValidationReport {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.stats = {
      circles: 0,
      roles: 0,
      people: 0,
      accountabilities: 0,
      domains: 0,
      policies: 0
    };
  }

  addIssue(severity, category, message, pageId = null, suggestedFix = null) {
    const issue = { severity, category, message, pageId, suggestedFix };
    if (pageId) issue.url = getPageUrl(pageId);
    
    if (severity === 'ERROR') {
      this.issues.push(issue);
    } else {
      this.warnings.push(issue);
    }
  }

  print() {
    console.log('\n' + '='.repeat(80));
    console.log('ORGDEV DATA INTEGRITY VALIDATION REPORT');
    console.log('='.repeat(80));
    console.log(`\nDatabase Sizes:`);
    console.log(`  Circles: ${this.stats.circles}`);
    console.log(`  Roles: ${this.stats.roles}`);
    console.log(`  People: ${this.stats.people}`);
    console.log(`  Accountabilities: ${this.stats.accountabilities}`);
    console.log(`  Domains: ${this.stats.domains}`);
    console.log(`  Policies: ${this.stats.policies}`);
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`ISSUES FOUND: ${this.issues.length}`);
    console.log(`WARNINGS: ${this.warnings.length}`);
    console.log('='.repeat(80));

    if (this.issues.length > 0) {
      console.log('\n🔴 CRITICAL ISSUES:\n');
      this.issues.forEach((issue, idx) => {
        console.log(`${idx + 1}. [${issue.category}] ${issue.message}`);
        if (issue.url) console.log(`   → ${issue.url}`);
        if (issue.suggestedFix) console.log(`   💡 Fix: ${issue.suggestedFix}`);
        console.log('');
      });
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:\n');
      this.warnings.forEach((issue, idx) => {
        console.log(`${idx + 1}. [${issue.category}] ${issue.message}`);
        if (issue.url) console.log(`   → ${issue.url}`);
        if (issue.suggestedFix) console.log(`   💡 Fix: ${issue.suggestedFix}`);
        console.log('');
      });
    }

    if (this.issues.length === 0 && this.warnings.length === 0) {
      console.log('\n✅ All validation checks passed!\n');
    }

    console.log('='.repeat(80) + '\n');
  }
}

async function runValidation() {
  const report = new ValidationReport();

  console.log('Fetching data from Notion...');
  
  // Fetch all databases
  const circles = await queryDatabase(DB_IDS.circles);
  const roles = await queryDatabase(DB_IDS.roles);
  const people = await queryDatabase(DB_IDS.people);
  const accountabilities = await queryDatabase(DB_IDS.accountabilities);
  const domains = await queryDatabase(DB_IDS.domains);
  const policies = await queryDatabase(DB_IDS.policies);

  report.stats.circles = circles.length;
  report.stats.roles = roles.length;
  report.stats.people = people.length;
  report.stats.accountabilities = accountabilities.length;
  report.stats.domains = domains.length;
  report.stats.policies = policies.length;

  console.log('Running validation checks...\n');

  // Build lookup maps
  const circleMap = new Map(circles.map(c => [c.id, c]));
  const roleMap = new Map(roles.map(r => [r.id, r]));
  const peopleMap = new Map(people.map(p => [p.id, p]));

  // CHECK 1: People with roles should be in circle memberships
  console.log('✓ Checking Person → Circle membership consistency...');
  for (const person of people) {
    const personName = getTitle(person);
    const roleIds = getRelationIds(person, PROPS.people_energizesRoles);
    const circleMembershipIds = getRelationIds(person, PROPS.people_circleMemberships);

    if (roleIds.length > 0) {
      // Get circles from roles
      const circlesFromRoles = new Set();
      for (const roleId of roleIds) {
        const role = roleMap.get(roleId);
        if (role) {
          const circleIds = getRelationIds(role, PROPS.roles_circle);
          circleIds.forEach(cid => circlesFromRoles.add(cid));
        }
      }

      // Check if person is member of those circles
      for (const circleId of circlesFromRoles) {
        if (!circleMembershipIds.includes(circleId)) {
          const circle = circleMap.get(circleId);
          const circleName = circle ? getTitle(circle) : 'Unknown Circle';
          report.addIssue(
            'WARNING',
            'Circle Membership',
            `${personName} energizes role(s) in "${circleName}" but is not listed as a circle member`,
            person.id,
            `Add ${personName} to "${circleName}" Circle Members`
          );
        }
      }
    }
  }

  // CHECK 2: Circle structural role slots should point to correct role types
  console.log('✓ Checking Circle structural roles...');
  const structuralRoleChecks = [
    { prop: PROPS.circles_circleLead, expectedType: 'Circle Lead' },
    { prop: PROPS.circles_circleRep, expectedType: 'Circle Rep' },
    { prop: PROPS.circles_secretary, expectedType: 'Secretary' },
    { prop: PROPS.circles_facilitator, expectedType: 'Facilitator' }
  ];

  for (const circle of circles) {
    const circleName = getTitle(circle);
    
    for (const check of structuralRoleChecks) {
      const roleIds = getRelationIds(circle, check.prop);
      
      // Check if slot is filled
      if (roleIds.length === 0) {
        report.addIssue(
          'WARNING',
          'Circle Structure',
          `Circle "${circleName}" has no ${check.expectedType} assigned`,
          circle.id,
          `Create and assign a ${check.expectedType} role to this circle`
        );
        continue;
      }

      // Check if role has correct type
      for (const roleId of roleIds) {
        const role = roleMap.get(roleId);
        if (!role) {
          report.addIssue(
            'ERROR',
            'Broken Relation',
            `Circle "${circleName}" ${check.prop} points to non-existent role`,
            circle.id,
            'Remove broken relation'
          );
          continue;
        }

        const roleType = getSelectValue(role, PROPS.roles_roleType);
        if (roleType !== check.expectedType) {
          const roleName = getTitle(role);
          report.addIssue(
            'ERROR',
            'Circle Structure',
            `Circle "${circleName}" ${check.prop} points to role "${roleName}" with type "${roleType}" (expected "${check.expectedType}")`,
            circle.id,
            `Change role type to "${check.expectedType}" or update circle's ${check.prop} field`
          );
        }
      }
    }
  }

  // CHECK 3: Roles with Energized By should have Role Status = Active
  console.log('✓ Checking Role Status consistency...');
  for (const role of roles) {
    const roleName = getTitle(role);
    const energizedBy = getRelationIds(role, PROPS.roles_energizedBy);
    const roleStatus = getFormulaValue(role, PROPS.roles_roleStatus);

    if (energizedBy.length > 0 && roleStatus !== 'Active') {
      report.addIssue(
        'ERROR',
        'Role Status',
        `Role "${roleName}" has person assigned but Role Status is "${roleStatus}" (expected "Active")`,
        role.id,
        'Check Role Status formula - should auto-compute from Energized By'
      );
    }

    if (energizedBy.length === 0 && roleStatus === 'Active') {
      report.addIssue(
        'ERROR',
        'Role Status',
        `Role "${roleName}" has Role Status "Active" but no person assigned`,
        role.id,
        'Assign a person to Energized By or check formula logic'
      );
    }
  }

  // CHECK 4: Roles should point to existing circles
  console.log('✓ Checking Role → Circle references...');
  for (const role of roles) {
    const roleName = getTitle(role);
    const circleIds = getRelationIds(role, PROPS.roles_circle);

    if (circleIds.length === 0) {
      report.addIssue(
        'WARNING',
        'Role → Circle',
        `Role "${roleName}" is not assigned to any Circle`,
        role.id,
        'Assign this role to a circle'
      );
      continue;
    }

    for (const circleId of circleIds) {
      if (!circleMap.has(circleId)) {
        report.addIssue(
          'ERROR',
          'Broken Relation',
          `Role "${roleName}" points to non-existent circle`,
          role.id,
          'Remove broken Circle relation'
        );
      }
    }
  }

  // CHECK 5: Orphaned people (no roles, no memberships, status Active)
  console.log('✓ Checking for orphaned People records...');
  for (const person of people) {
    const personName = getTitle(person);
    const roleIds = getRelationIds(person, PROPS.people_energizesRoles);
    const circleMembershipIds = getRelationIds(person, PROPS.people_circleMemberships);
    const personStatus = getSelectValue(person, PROPS.people_personStatus);

    if (roleIds.length === 0 && circleMembershipIds.length === 0 && personStatus === 'Active') {
      report.addIssue(
        'WARNING',
        'Orphaned Record',
        `Person "${personName}" has status "Active" but no roles and no circle memberships`,
        person.id,
        'Assign roles/memberships or change status to Former/External'
      );
    }
  }

  // CHECK 6: Owning Circle rule - all non-Anchor circles should have Owning Circle set
  console.log('✓ Checking Owning Circle compliance...');
  for (const circle of circles) {
    const circleName = getTitle(circle);
    const owningCircleIds = getRelationIds(circle, PROPS.circles_owningCircle);
    
    // Check if this is the Anchor Circle (top-level, no super-circle)
    // Anchor Circle is "VdL Farm" in this system
    const isAnchorCircle = circleName === 'VdL Farm';
    
    if (!isAnchorCircle && owningCircleIds.length === 0) {
      report.addIssue(
        'ERROR',
        'Owning Circle',
        `Circle "${circleName}" is missing required Owning Circle field`,
        circle.id,
        'Manually set the Owning Circle field - this does NOT auto-populate from Role field'
      );
    }
  }

  // CHECK 7: Owning Circle should match one of the circles where the role is assigned
  console.log('✓ Checking Owning Circle validity...');
  for (const circle of circles) {
    const circleName = getTitle(circle);
    const owningCircleIds = getRelationIds(circle, PROPS.circles_owningCircle);
    
    if (owningCircleIds.length > 0) {
      const owningCircleId = owningCircleIds[0];
      const owningCircle = circleMap.get(owningCircleId);
      
      if (!owningCircle) {
        report.addIssue(
          'ERROR',
          'Broken Relation',
          `Circle "${circleName}" Owning Circle points to non-existent circle`,
          circle.id,
          'Fix Owning Circle relation'
        );
      }
    }
  }

  return report;
}

// Run validation
runValidation()
  .then(report => {
    report.print();
    process.exit(report.issues.length > 0 ? 1 : 0);
  })
  .catch(err => {
    console.error('Validation failed:', err);
    process.exit(2);
  });
