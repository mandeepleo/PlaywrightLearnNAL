# Playwright Learning Project

A Playwright + TypeScript test automation learning repository based on Naveen Automation Labs-style examples.

## Overview

This project demonstrates Playwright end-to-end testing patterns using TypeScript, custom fixtures, browser automation, and reporting with Allure.

Key features:

- `@playwright/test` test runner
- TypeScript-based test files in `tests/`
- Project config in `playwright.config.ts`
- Allure reporting support via `allure-playwright`
- Example test data files in `test-data/`
- Test helpers and utilities in `src/`

## Repository Structure

- `tests/` — Playwright spec files
- `src/` — helper scripts, page logic, and utilities
- `fixture/` — custom fixtures and fixture helpers
- `test-data/` — JSON data for login and other scenarios
- `playwright.config.ts` — Playwright configuration
- `storageState.json` — persisted auth/session state for tests
- `allure-results/` — generated Allure result JSON files
- `playwright-report/` — generated Playwright HTML reports
- `allure-report/` — generated Allure HTML reports

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browser dependencies if needed:

```bash
npx playwright install
```

3. Ensure environment variables are available in `src/config/.env` or `src/config/.env.<NODE_ENV>`.

## Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

Run tests in headed mode for debugging:

```bash
npx playwright test --headed
```

Run tests with trace collection:

```bash
npx playwright test --trace=on
```

## Reporting

### Playwright HTML report

Generate and open the Playwright HTML report:

```bash
npx playwright show-report
```

### Allure report

Generate the Allure report from results and open it in the browser:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

> Note: Allure results are configured in `playwright.config.ts` with the `allure-playwright` reporter and output folder `my-allure-results`.

## Common Notes

- The configuration file loads environment values from `src/config/.env` by default.
- Tests run in Chromium by default but can be extended to Firefox and WebKit via `playwright.config.ts`.
- The repository includes examples of browser actions, file upload/download, dialogs, frames, locators, and assertions.

## Recommended Commands

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## License

This repository is provided for learning and demonstration purposes.
