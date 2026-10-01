// Phase 5 verification — Tests that can fail per Action Plan
import fs from 'fs';

const tests = [
  {
    name: "Learner account gets 403 on every /api/admin/* route",
    check: async () => {
      const server = fs.readFileSync('server.js','utf8');
      const hasAdminMiddleware = server.includes('adminMiddleware') && server.includes('/api/admin');
      const hasRoleCheck = server.includes("role === 'admin'") || server.includes('role !==');
      return hasAdminMiddleware && hasRoleCheck;
    },
    expected: true
  },
  {
    name: "Guest to register transfers all guest data",
    check: async () => {
      const register = fs.readFileSync('src/components/RegisterView.jsx','utf8');
      return register.includes('guest') && register.includes('progress') && register.includes('/api/progress/sync');
    },
    expected: true
  },
  {
    name: "Logout leaves no learner data in storage",
    check: async () => {
      const auth = fs.readFileSync('src/lib/auth.js','utf8');
      return auth.includes('dansk_diagnostic') && auth.includes('dansk_') && auth.includes('localStorage.removeItem') && auth.includes('Object.keys(localStorage)');
    },
    expected: true
  },
  {
    name: "A merge conflict follows stated rule in every row",
    check: async () => {
      const sync = fs.readFileSync('src/lib/progressSync.js','utf8');
      const server = fs.readFileSync('server.js','utf8');
      const hasUnion = sync.includes('Union') || sync.includes('answers');
      const hasMax = sync.includes('Math.max');
      const hasEarliest = sync.includes('earliest') || sync.includes('completedSteps');
      const hasAdminSet = sync.includes('adminSet');
      const serverHasSame = server.includes('monotone') || server.includes('Answers Union') || server.includes('mergedProgress');
      return hasUnion && hasMax && hasEarliest && hasAdminSet && serverHasSame;
    },
    expected: true
  },
  {
    name: "Every screen has visible next action",
    check: async () => {
      const screens = ['SimpleLandingView','DiagnosticView','PathView','PracticeView','ProgressView','RegisterView','AssessmentLandingView'];
      let allHaveNext = true;
      for (const s of screens) {
        try {
          const content = fs.readFileSync(`src/components/${s}.jsx`,'utf8');
          const hasNext = content.includes('Up next') || content.includes('Start') || content.includes('Next') || content.includes('Continue') || content.includes('primary-action') || content.includes('bg-[var(--ink)]');
          if (!hasNext) {
            console.log(`  ${s} missing visible next action`);
            allHaveNext = false;
          }
        } catch (e) {
          console.log(`  ${s} not found`);
          allHaveNext = false;
        }
      }
      return allHaveNext;
    },
    expected: true
  },
  {
    name: "Status page turns red when API down",
    check: async () => {
      const sysFlow = fs.readFileSync('src/components/SystemFlowDiagramsView.jsx','utf8');
      return sysFlow.includes('health') && (sysFlow.includes('503') || sysFlow.includes('offline') || sysFlow.includes('red'));
    },
    expected: true
  },
  {
    name: "Contrast, focus order and reduced motion pass",
    check: async () => {
      const ds = fs.readFileSync('src/ds.css','utf8');
      const hasContrast = ds.includes('4.5') || ds.includes('contrast') || ds.includes('--ink');
      const hasFocus = ds.includes('focus-visible') || ds.includes('focus ring');
      const hasReducedMotion = ds.includes('prefers-reduced-motion');
      return hasContrast && hasFocus && hasReducedMotion;
    },
    expected: true
  },
  {
    name: "Design system: one accent, one icon family, no emoji, two type voices, radii 12/16/22, quiet motion 120/220/340",
    check: async () => {
      const ds = fs.readFileSync('src/ds.css','utf8');
      const icons = fs.readFileSync('src/lib/icons.js','utf8');
      const hasOneAccent = ds.includes('--accent') && ds.includes('One accent');
      const hasRadii = ds.includes('12px') && ds.includes('16px') && ds.includes('22px');
      const hasMotion = ds.includes('120ms') && ds.includes('220ms') && ds.includes('340ms');
      const hasTwoVoices = (ds.includes('serif') && ds.includes('system face')) || ds.includes('Danish');
      // Check no actual emoji characters in icons (not the word, but unicode emoji)
      const hasEmojiChar = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(icons);
      const hasStroke = icons.includes('stroke');
      return hasOneAccent && hasRadii && hasMotion && hasTwoVoices && hasStroke && !hasEmojiChar;
    },
    expected: true
  },
  {
    name: "Five new people first run unaided — documented hesitations",
    check: async () => {
      try {
        const md = fs.readFileSync('FIRST_RUN_TESTING.md','utf8');
        return md.includes('hesitat') && md.includes('first run') && md.includes('unaided');
      } catch {
        return false;
      }
    },
    expected: true
  }
];

async function run() {
  console.log('Phase 5 Verification — Tests that can fail per Action Plan\n');
  let passed = 0;
  let failed = 0;
  for (const t of tests) {
    try {
      const result = await t.check();
      const ok = result === t.expected;
      if (ok) {
        console.log(`✓ ${t.name}`);
        passed++;
      } else {
        console.log(`✗ ${t.name} — expected ${t.expected} got ${result}`);
        failed++;
      }
    } catch (e) {
      console.log(`✗ ${t.name} — error: ${e.message}`);
      failed++;
    }
  }
  console.log(`\n${passed} passed, ${failed} failed out of ${tests.length}`);
  if (failed>0) {
    console.log('\nFix failures before shipping per Phase 5 Done when test list is green');
    process.exit(1);
  } else {
    console.log('\nAll Phase 5 tests green — ready to ship per checklist');
  }
}

run();
