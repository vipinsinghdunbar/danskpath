#!/bin/bash

# Beta Testing Workflow Automation
# This script handles the beta testing cycle Oct 14-18

set -e

echo "🚀 DanskPath Beta Testing Workflow"
echo "=================================="
echo ""
echo "Timeline: Oct 14–18, 2026"
echo "Objective: Test hypothesis — real curriculum ≥4/5?"
echo ""

# Create test data directory
mkdir -p beta-testing/responses
mkdir -p beta-testing/reports

echo "✅ Beta testing workspace created"
echo ""
echo "Next steps:"
echo "1. Create Google Form (https://forms.google.com)"
echo "   - Copy 7 questions from google_form_questions.txt"
echo "   - Get form link (forms.gle/...)"
echo ""
echo "2. Send launch message to 5–10 testers"
echo "   - Use launch_message.md as template"
echo "   - Replace [form link] with actual URL"
echo ""
echo "3. Monitor responses Oct 14–17"
echo "   - Google Form collects automatically"
echo "   - Download as CSV on Oct 17"
echo ""
echo "4. Analyze Oct 18"
echo "   - Average curriculum rating"
echo "   - Count ≥4/5 responses"
echo "   - Identify feature requests"
echo "   - Make Phase 2 decision"
echo ""
