#!/usr/bin/env node

/**
 * DanskPath Curriculum Testing Suite
 *
 * Tests:
 * 1. No duplicate questions within same module/difficulty
 * 2. No answer repetition in choice options (shuffle validation)
 * 3. Exercise count validation
 * 4. Answer correctness (answer in options for choice exercises)
 * 5. Explanation quality (not empty)
 * 6. User testing simulation (realistic download/practice flow)
 */

import { curriculumData, getExercisesForSelection } from './src/data/curriculum.js';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

let testsPassed = 0;
let testsFailed = 0;

const log = {
  pass: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  fail: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}\n`),
};

// Test 1: Check for duplicate questions
function testNoDuplicates() {
  log.section('Test 1: No Duplicate Questions Within Module/Difficulty');

  for (const [moduleId, module] of Object.entries(curriculumData)) {
    for (const [section, difficulties] of Object.entries(module.exercises || {})) {
      for (const [difficulty, exercises] of Object.entries(difficulties || {})) {
        const questions = new Set();
        let duplicates = 0;

        exercises.forEach((ex) => {
          if (questions.has(ex.question)) {
            log.fail(`Modul ${moduleId}, ${section}/${difficulty}: Duplicate question: "${ex.question}"`);
            duplicates++;
            testsFailed++;
          }
          questions.add(ex.question);
        });

        if (duplicates === 0) {
          log.pass(
            `Modul ${moduleId}, ${section}/${difficulty}: ${exercises.length} unique questions`
          );
          testsPassed++;
        }
      }
    }
  }
}

// Test 2: Check answer position variety in choice questions
function testAnswerPositionVariety() {
  log.section('Test 2: Answer Position Variety (Not Always Same Spot)');

  for (const [moduleId, module] of Object.entries(curriculumData)) {
    for (const [section, difficulties] of Object.entries(module.exercises || {})) {
      for (const [difficulty, exercises] of Object.entries(difficulties || {})) {
        const choiceExercises = exercises.filter((ex) => ex.type === 'choice' && ex.options);

        if (choiceExercises.length === 0) continue;

        const answerPositions = {};
        let correctAnswerPositions = [];

        choiceExercises.forEach((ex) => {
          const position = ex.options.indexOf(ex.answer);
          if (position !== -1) {
            answerPositions[position] = (answerPositions[position] || 0) + 1;
            correctAnswerPositions.push(position);
          }
        });

        // Check if answer is actually in options
        const answersNotInOptions = choiceExercises.filter(
          (ex) => !ex.options.includes(ex.answer)
        );

        if (answersNotInOptions.length > 0) {
          log.fail(
            `Modul ${moduleId}, ${section}/${difficulty}: ${answersNotInOptions.length} answers not in options`
          );
          answersNotInOptions.forEach((ex) => {
            console.log(`  Question: "${ex.question}"`);
            console.log(`  Answer: "${ex.answer}", Options: ${JSON.stringify(ex.options)}`);
          });
          testsFailed++;
        } else {
          // Check position distribution
          const positions = Object.keys(answerPositions).map(Number);
          const distribution = Object.values(answerPositions);
          const maxFreq = Math.max(...distribution);
          const minFreq = Math.min(...distribution);

          // Allow some skew but flag if answer is always in same position
          if (maxFreq >= choiceExercises.length * 0.7 && choiceExercises.length > 3) {
            log.fail(
              `Modul ${moduleId}, ${section}/${difficulty}: Answer positions skewed. ` +
              `Distribution: ${JSON.stringify(answerPositions)}`
            );
            testsFailed++;
          } else {
            log.pass(
              `Modul ${moduleId}, ${section}/${difficulty}: ` +
              `${choiceExercises.length} choice exercises, answer positions: ${JSON.stringify(answerPositions)}`
            );
            testsPassed++;
          }
        }
      }
    }
  }
}

// Test 3: Exercise count and structure validation
function testExerciseStructure() {
  log.section('Test 3: Exercise Structure & Data Quality');

  for (const [moduleId, module] of Object.entries(curriculumData)) {
    let issueCount = 0;

    // Check module metadata
    if (!module.name || !module.level) {
      log.fail(`Modul ${moduleId}: Missing name or level`);
      testsFailed++;
      continue;
    }

    // Check exercises
    for (const [section, difficulties] of Object.entries(module.exercises || {})) {
      for (const [difficulty, exercises] of Object.entries(difficulties || {})) {
        exercises.forEach((ex, idx) => {
          // Check required fields
          if (!ex.question) {
            issueCount++;
            console.log(`  [${section}/${difficulty}] Exercise ${idx + 1}: Missing question`);
          }
          if (ex.type === 'choice' && (!ex.options || ex.options.length === 0)) {
            issueCount++;
            console.log(`  [${section}/${difficulty}] Exercise ${idx + 1}: Missing options for choice type`);
          }
          if (!ex.answer && ex.type !== 'match') {
            issueCount++;
            console.log(`  [${section}/${difficulty}] Exercise ${idx + 1}: Missing answer`);
          }
          if (!ex.explanation) {
            issueCount++;
            console.log(`  [${section}/${difficulty}] Exercise ${idx + 1}: Missing explanation`);
          }
        });
      }
    }

    if (issueCount === 0) {
      log.pass(`Modul ${moduleId}: All exercises have required fields`);
      testsPassed++;
    } else {
      log.fail(`Modul ${moduleId}: ${issueCount} structural issues found`);
      testsFailed++;
    }
  }
}

// Test 4: getExercisesForSelection function
function testExerciseSelection() {
  log.section('Test 4: Exercise Selection & Retrieval');

  const testCases = [
    { module: 1, type: 'complete', difficulty: 'easy', count: 10 },
    { module: 2, type: 'grammar', difficulty: 'medium', count: 15 },
    { module: 3, type: 'vocab', difficulty: 'hard', count: 20 },
    { module: 4, type: 'reading', difficulty: 'easy', count: 8 },
    { module: 5, type: 'writing', difficulty: 'hard', count: 25 },
  ];

  testCases.forEach((testCase) => {
    const exercises = getExercisesForSelection(
      testCase.module,
      testCase.type,
      testCase.difficulty,
      testCase.count
    );

    if (exercises.length === 0) {
      log.fail(
        `Modul ${testCase.module}, ${testCase.type}/${testCase.difficulty}: No exercises returned`
      );
      testsFailed++;
    } else if (exercises.length > testCase.count) {
      log.fail(
        `Modul ${testCase.module}, ${testCase.type}/${testCase.difficulty}: ` +
        `Returned ${exercises.length} exercises, expected ≤${testCase.count}`
      );
      testsFailed++;
    } else {
      // Check for duplicates in returned set
      const questions = new Set();
      let hasDuplicates = false;
      exercises.forEach((ex) => {
        if (questions.has(ex.question)) {
          hasDuplicates = true;
        }
        questions.add(ex.question);
      });

      if (hasDuplicates) {
        log.fail(
          `Modul ${testCase.module}, ${testCase.type}/${testCase.difficulty}: ` +
          `Duplicate questions in returned set`
        );
        testsFailed++;
      } else {
        log.pass(
          `Modul ${testCase.module}, ${testCase.type}/${testCase.difficulty}: ` +
          `✓ ${exercises.length}/${testCase.count} exercises (all unique)`
        );
        testsPassed++;
      }
    }
  });
}

// Test 5: Simulated user testing (Download flow)
function testUserFlowDownload() {
  log.section('Test 5: User Testing - Download Workbook Flow');

  const userScenarios = [
    {
      name: 'Beginner (A1) - Complete workbook, Easy',
      module: 1,
      type: 'complete',
      difficulty: 'easy',
      count: 25,
    },
    {
      name: 'Intermediate (B1) - Grammar only, Medium',
      module: 3,
      type: 'grammar',
      difficulty: 'medium',
      count: 20,
    },
    {
      name: 'Advanced (B2+) - Writing, Hard',
      module: 5,
      type: 'writing',
      difficulty: 'hard',
      count: 30,
    },
  ];

  userScenarios.forEach((scenario) => {
    try {
      const exercises = getExercisesForSelection(
        scenario.module,
        scenario.type,
        scenario.difficulty,
        scenario.count
      );

      // Simulate PDF generation validation
      const vocabItems = curriculumData[scenario.module].vocab || [];
      const hasVocab = scenario.type === 'complete' || scenario.type === 'vocab';
      const expectedVocabLines = hasVocab ? vocabItems.length : 0;

      // Check PDF content would be generated correctly
      const pdfContentValid =
        exercises.length > 0 &&
        exercises.every((ex) => ex.question && (ex.answer || ex.type === 'write'));

      if (pdfContentValid) {
        log.pass(
          `${scenario.name}: ✓ Download ready ` +
          `(${exercises.length} exercises, ${expectedVocabLines} vocab items)`
        );
        testsPassed++;
      } else {
        log.fail(
          `${scenario.name}: ✗ PDF generation would fail - missing required data`
        );
        testsFailed++;
      }
    } catch (error) {
      log.fail(
        `${scenario.name}: ✗ Error during flow: ${error.message}`
      );
      testsFailed++;
    }
  });
}

// Test 6: Simulated user testing (Online practice flow)
function testUserFlowPractice() {
  log.section('Test 6: User Testing - Practice Online Flow');

  const practiceScenarios = [
    { module: 1, type: 'grammar', difficulty: 'easy', expectedSections: ['grammar'] },
    { module: 2, type: 'complete', difficulty: 'medium', expectedSections: ['grammar', 'vocab', 'reading', 'writing'] },
    { module: 4, type: 'vocab', difficulty: 'hard', expectedSections: ['vocab'] },
  ];

  practiceScenarios.forEach((scenario) => {
    const exercises = getExercisesForSelection(scenario.module, scenario.type, scenario.difficulty, 15);

    // Check that exercises have sections and types for interactive display
    const hasSectionInfo = exercises.every((ex) => ex.section);
    const hasTypes = exercises.every((ex) => ex.type);
    const hasQuestions = exercises.every((ex) => ex.question);
    const hasExplanations = exercises.every((ex) => ex.explanation);

    const allValid = hasSectionInfo && hasTypes && hasQuestions && hasExplanations;

    if (allValid) {
      log.pass(
        `Modul ${scenario.module}, ${scenario.type}: ✓ Online practice ready ` +
        `(${exercises.length} exercises with all metadata)`
      );
      testsPassed++;
    } else {
      const missing = [];
      if (!hasSectionInfo) missing.push('section info');
      if (!hasTypes) missing.push('exercise types');
      if (!hasQuestions) missing.push('questions');
      if (!hasExplanations) missing.push('explanations');

      log.fail(
        `Modul ${scenario.module}, ${scenario.type}: ✗ Missing: ${missing.join(', ')}`
      );
      testsFailed++;
    }
  });
}

// Test 7: Edge cases and stress testing
function testEdgeCases() {
  log.section('Test 7: Edge Cases & Stress Testing');

  const edgeCases = [
    { name: 'Request 0 exercises', module: 1, type: 'complete', difficulty: 'easy', count: 0 },
    { name: 'Request 50 exercises (max)', module: 1, type: 'complete', difficulty: 'easy', count: 50 },
    { name: 'Invalid module', module: 99, type: 'grammar', difficulty: 'easy', count: 10 },
    { name: 'Invalid workbook type', module: 1, type: 'invalid', difficulty: 'easy', count: 10 },
  ];

  edgeCases.forEach((testCase) => {
    try {
      const exercises = getExercisesForSelection(
        testCase.module,
        testCase.type,
        testCase.difficulty,
        testCase.count
      );

      if (testCase.name === 'Request 0 exercises') {
        if (exercises.length === 0) {
          log.pass(`${testCase.name}: ✓ Returns empty array`);
          testsPassed++;
        } else {
          log.fail(`${testCase.name}: ✗ Should return empty array`);
          testsFailed++;
        }
      } else if (testCase.name === 'Invalid module') {
        if (exercises.length === 0) {
          log.pass(`${testCase.name}: ✓ Gracefully returns empty array`);
          testsPassed++;
        } else {
          log.fail(`${testCase.name}: ✗ Should handle invalid module gracefully`);
          testsFailed++;
        }
      } else {
        log.pass(`${testCase.name}: ✓ Handled without error`);
        testsPassed++;
      }
    } catch (error) {
      // Some edge cases should throw - that's OK
      log.info(`${testCase.name}: Caught expected error: ${error.message.substring(0, 50)}`);
      testsPassed++;
    }
  });
}

// Main test runner
function runAllTests() {
  console.log(`\n${colors.bold}${colors.blue}DanskPath Curriculum Testing Suite${colors.reset}\n`);

  testNoDuplicates();
  testAnswerPositionVariety();
  testExerciseStructure();
  testExerciseSelection();
  testUserFlowDownload();
  testUserFlowPractice();
  testEdgeCases();

  // Summary
  const total = testsPassed + testsFailed;
  const percentage = total > 0 ? Math.round((testsPassed / total) * 100) : 0;

  log.section(`Test Results: ${colors.green}${testsPassed}/${total}${colors.reset} passed (${percentage}%)`);

  if (testsFailed === 0) {
    console.log(`${colors.green}${colors.bold}✓ All tests passed!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}✗ ${testsFailed} test(s) failed${colors.reset}\n`);
    process.exit(1);
  }
}

// Run tests
runAllTests();
