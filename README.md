# Demo-configuration

A React + TypeScript demo app for managing a list of users (list, view, create,
edit, delete), built on Vite. It's used as a playground for exercising a
typical modern front-end toolchain end to end: routing, forms/validation,
server state, styling, testing (unit + e2e), linting/formatting, and CI/CD.

## Tech stack

- **[React 19](https://react.dev/)** + **[TypeScript](https://www.typescriptlang.org/)** (strict mode) on **[Vite](https://vite.dev/)**
- **[React Router](https://reactrouter.com/)** for routing
- **[TanStack Query](https://tanstack.com/query/latest)** for server state (fetching/caching/mutations)
- **[React Hook Form](https://react-hook-form.com/)** + **[Zod](https://zod.dev/)** for forms and schema validation
- **[Tailwind CSS](https://tailwindcss.com/)** for styling
- **[react-hot-toast](https://react-hot-toast.com/)** for notifications
- **[react-error-boundary](https://github.com/bvaughn/react-error-boundary)** for graceful error handling
- **[Vitest](https://vitest.dev/)** + **[React Testing Library](https://testing-library.com/react)** for unit/component tests
- **[Playwright](https://playwright.dev/)** for end-to-end tests
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** for linting/formatting
- **[Husky](https://typicode.github.io/husky/)** for git hooks
- **GitHub Actions** for CI, plus **Dependabot** for dependency updates

## Getting started

### Prerequisites

- Node.js `22.x` (see [`.nvmrc`](./.nvmrc)) — if you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` in the project root.

### Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Environment variables

Copy `.env.example` to `.env.local` and adjust as needed:

```bash
cp .env.example .env.local
```

| Variable            | Description                | Default                                |
| ------------------- | -------------------------- | -------------------------------------- |
| `VITE_API_BASE_URL` | Base URL for the users API | `https://jsonplaceholder.typicode.com` |

Env vars are validated at startup with Zod (see [`src/config/env.ts`](./src/config/env.ts)) — the app fails fast with a clear error if a variable is malformed, rather than failing mysteriously later. Since a sensible default is provided, the app works out of the box with no `.env` file at all.

## Available scripts

| Script                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                       |
| `npm run build`        | Type-check (`tsc -b`) and build for production  |
| `npm run preview`      | Preview the production build locally            |
| `npm run lint`         | Run ESLint                                      |
| `npm run format`       | Format the codebase with Prettier               |
| `npm run format:check` | Check formatting without writing changes        |
| `npm test`             | Run unit/component tests in watch mode (Vitest) |
| `npm run test:ci`      | Run unit/component tests once with coverage     |
| `npm run test:e2e`     | Run Playwright end-to-end tests                 |
| `npm run test:e2e:ui`  | Run Playwright tests in interactive UI mode     |

## Project structure

```
src/
├── components/     # Shared, reusable UI components (ConfirmDialog, ErrorBoundary, ...)
├── config/         # App configuration (validated env vars)
├── features/users/ # User feature: list, details, create/edit forms, Zod schema
├── layouts/        # Route layouts (e.g. RootLayout with nav)
├── pages/          # Top-level, non-feature pages (Home, About, NotFound)
├── services/       # API client functions (fetch calls)
├── test/           # Test setup (jest-dom matchers for Vitest)
├── utils/          # Small, pure helper functions
├── App.tsx         # Root component: providers (React Query, ErrorBoundary) + router
├── router.tsx      # Route definitions
└── main.tsx        # App entry point

e2e/                # Playwright end-to-end tests and fixtures
```

## Testing

This project has two separate, complementary test layers:

- **Unit/component tests** (Vitest + React Testing Library) live next to the code they test (`*.test.ts(x)`). Run with `npm test` (watch mode) or `npm run test:ci` (single run with coverage).
- **End-to-end tests** (Playwright) live under [`e2e/`](./e2e) and exercise the app through a real browser against a running dev server. API calls are intercepted with mock fixtures ([`e2e/fixtures/`](./e2e/fixtures)) so tests are deterministic and don't depend on the real JSONPlaceholder API. Run with `npm run test:e2e`.

## Git hooks (Husky)

A `pre-push` hook (see [`.husky/pre-push`](./.husky/pre-push)) runs before every `git push`:

```
format:check → lint → unit tests (with coverage) → e2e tests
```

If any step fails, the push is aborted. This is a local safety net — it can be bypassed with `git push --no-verify`, which is why the same checks are also enforced server-side in CI (see below).

Hooks are wired up automatically via the `prepare` script, so a fresh `npm install` after cloning is all that's needed.

## CI/CD

Two GitHub Actions workflows, both reading the Node version from [`.nvmrc`](./.nvmrc) so it never drifts out of sync with local dev:

- **[`.github/workflows/ci.yml`](./.github/workflows/ci.yml)** — runs on every push/PR to `main` (and manually via `workflow_dispatch`): dependency audit (`npm audit --audit-level=high`), formatting check, lint, build, and unit tests (with a coverage report uploaded as a build artifact).
- **[`.github/workflows/playwright.yml`](./.github/workflows/playwright.yml)** — runs automatically after `CI` succeeds: the full Playwright e2e suite, with the HTML report uploaded as a build artifact.

**[`.github/dependabot.yml`](./.github/dependabot.yml)** opens weekly PRs for outdated npm dependencies and GitHub Actions, with patch/minor updates grouped to keep PR volume manageable.

## Code style

- **TypeScript strict mode** is enabled — see [`tsconfig.app.json`](./tsconfig.app.json).
- **ESLint** ([`eslint.config.js`](./eslint.config.js)) handles code-quality rules; **Prettier** ([`.prettierrc.json`](./.prettierrc.json)) handles formatting. `eslint-config-prettier` disables any ESLint rule that would conflict with Prettier, so the two never fight each other.
