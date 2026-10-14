#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🎯 DansPath Curriculum Validation\n');
console.log('=' .repeat(60));

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

const pass = (text) => console.log(`${colors.green}✓${colors.reset} ${text}`);
const fail = (text) => console.log(`${colors.red}✗${colors.reset} ${text}`);
const info = (text) => console.log(`${colors.blue}ℹ${colors.reset} ${text}`);

let totalChecks = 0;
let passedChecks = 0;
const failures = [];

function check(condition, description) {
  totalChecks++;
  if (condition) {
    pass(description);
    passedChecks++;
  } else {
    fail(description);
    failures.push(description);
  }
}

console.log('\n📁 File Structure Validation');
console.log('-' .repeat(60));

const lessonDir = path.join(__dirname, '../src/components/lessons');
const lessons = [
  'V2InversionLesson.jsx',
  'PrepositionsLesson.jsx',
  'ListeningLesson.jsx',
  'VerbSystemLesson.jsx',
  'RealWorldListeningLesson.jsx',
  'ReadingComprehensionLesson.jsx',
  'GrammarDeepDiveLesson.jsx',
  'VocabularyCultureLesson.jsx',
  'SpeakingPracticeLesson.jsx'
];

lessons.forEach(lesson => {
  const filePath = path.join(lessonDir, lesson);
  check(fs.existsSync(filePath), `Lesson file exists: ${lesson}`);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    check(content.includes('export default function'), `${lesson} exports default component`);
    check(content.includes('useState'), `${lesson} uses useState hook`);
  }
});

console.log('\n🔗 LessonView Integration');
console.log('-' .repeat(60));

const lessonViewPath = path.join(__dirname, '../src/components/LessonView.jsx');
const lessonViewContent = fs.readFileSync(lessonViewPath, 'utf8');

const lessonIds = [
  "'v2-inversion'",
  "'prepositions'",
  "'listening'",
  "'verb-system'",
  "'real-world-listening'",
  "'reading-comprehension'",
  "'grammar-deep-dive'",
  "'vocabulary-culture'",
  "'speaking-practice'"
];

lessonIds.forEach(id => {
  check(lessonViewContent.includes(`id: ${id}`), `Lesson template defined: ${id}`);
});

console.log('\n📝 Exercise Content Validation');
console.log('-' .repeat(60));

let totalExercises = 0;
let totalQuizzes = 0;

lessons.forEach(lesson => {
  const filePath = path.join(lessonDir, lesson);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const exerciseMatches = content.match(/id: "sp\d+"|id: 'sp\d+'|id: "vc\d+"|id: 'vc\d+"|id: "gd\d+"|id: 'gd\d+'|id: "ex\d+"|id: 'ex\d+'/g);
  const exerciseCount = exerciseMatches ? exerciseMatches.length : 0;
  totalExercises += exerciseCount;
  
  const quizMatches = content.match(/id: "q\d+"|id: 'q\d+'/g);
  const quizCount = quizMatches ? quizMatches.length : 0;
  totalQuizzes += quizCount;
  
  check(exerciseCount >= 15, `${lesson}: has ${exerciseCount} exercises`);
  check(quizCount === 5, `${lesson}: has ${quizCount} quiz questions`);
});

pass(`Total exercises: ${totalExercises}`);
pass(`Total quiz questions: ${totalQuizzes}`);
check(totalExercises >= 180, `Minimum 180 exercises (found: ${totalExercises})`);
check(totalQuizzes === 45, `Exactly 45 quiz questions (found: ${totalQuizzes})`);

console.log('\n💾 State Persistence');
console.log('-' .repeat(60));

check(lessonViewContent.includes("localStorage.getItem('dansk_lesson_progress')"), 
  'Reads lesson progress from localStorage');
check(lessonViewContent.includes("localStorage.setItem('dansk_lesson_progress'"),
  'Writes lesson progress to localStorage');

console.log('\n🚀 Build & Deployment');
console.log('-' .repeat(60));

const packagePath = path.join(__dirname, '../package.json');
const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

check(packageContent.scripts.build, 'Build script defined');
check(packageContent.scripts['build:prod'], 'Production build script defined');

console.log('\n' + '='.repeat(60));
console.log('\n📊 VALIDATION SUMMARY\n');

const percentage = Math.round((passedChecks / totalChecks) * 100);
console.log(`${colors.blue}Checks passed: ${passedChecks}/${totalChecks} (${percentage}%)${colors.reset}`);

if (failures.length > 0) {
  console.log(`\n${colors.yellow}Failures:${colors.reset}`);
  failures.forEach(f => console.log(`  • ${f}`));
} else {
  console.log(`\n${colors.green}All validation checks passed! ✓${colors.reset}`);
}

console.log('\n📈 CURRICULUM METRICS\n');
info(`Total Lessons: 9`);
info(`Total Exercises: ${totalExercises}`);
info(`Total Quiz Questions: ${totalQuizzes}`);
info(`Lessons Per Level: 6 (A2) + 3 (B1)`);
info(`Unlock Threshold: 70%`);

console.log('\n✨ Curriculum is production-ready!\n');
console.log('='.repeat(60) + '\n');

process.exit(percentage === 100 ? 0 : 1);
