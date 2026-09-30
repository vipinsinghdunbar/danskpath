# DECISIONS

Record decisions here so they are not re-debated. Format: date, decision, reason.

- 2026-09-28: GitHub is the source of truth. The chat is the interface, the repository is the memory. Reason: sessions do not remember each other.
- 2026-09-28: One session equals one request equals one branch equals one PR. Reason: Arena supports one PR per chat session. (Note: this rule was explicitly relaxed by the Product Owner for the initial factory-setup session, which provisions several repositories at once.)
- 2026-09-28: The factory never merges to `main` or deploys to production. The Product Owner merges after CI and preview review. Reason: controlled autonomy while trust is being built.
- 2026-09-28: Roles are checklists inside one orchestrator, not separate agents. Reason: simpler and cheaper until the pilot proves the need.
- 2026-09-28: CI is the objective gate for verification. Reason: the factory's own claims are not evidence.
- 2026-09-28: npm is the package manager; Playwright is added as `@playwright/test` (the repo already shipped the `playwright` library but no test runner). Reason: needed for the mobile smoke test; no other dependencies added.
- 2026-09-28: The one oxlint parse error (bare `>` in JSX text, `ArchitectureMapView.jsx`) was fixed with an HTML entity — a behaviour-neutral fix so CI can be green. Reason: failing check on `main`; fix limit is 2 attempts; disclosed in the PR.
- 2026-09-28: `.github/workflows/deploy.yml` is left untouched; `ci.yml` is added alongside it. Reason: do not change deployment configuration without Product Owner approval.
