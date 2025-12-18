# Copilot Instructions for react-carousel-query

## Project Overview

**react-carousel-query** is a React component library that provides an infinite carousel with built-in pagination management. It fetches data on demand as users navigate through slides, handling API requests automatically.

### Key Features

- Infinite carousel with automatic pagination
- Touch and mouse swipe support for mobile/desktop
- Customizable rendering (slides, arrows, badges)
- Zero external dependencies (except React and classnames)
- TypeScript declarations included

## Tech Stack

| Category        | Technology                                     |
| --------------- | ---------------------------------------------- |
| Framework       | React 18                                       |
| Language        | JavaScript (ES2021) with JSX                   |
| Build           | Vite 6                                         |
| Styling         | CSS Modules (`.module.css`)                    |
| Testing         | Vitest + React Testing Library                 |
| Linting         | ESLint (react + prettier)                      |
| Formatting      | Prettier                                       |
| Package Manager | npm                                            |
| Node Version    | **>=20.0.0** (see `.nvmrc`)                    |
| Documentation   | Storybook 8                                    |
| Commits         | Conventional Commits (commitizen + commitlint) |

## Project Structure

```
src/
├── index.js                    # Main entry - exports ReactCarouselQuery, ReactCarousel, useSlider
├── components/
│   ├── reactCarouselQuery/     # Main component with query management
│   ├── reactCarousel/          # Simpler carousel without query management
│   ├── carouselItemsContainer/ # Core slider container with touch/mouse events
│   ├── carouselItem/           # Individual slide wrapper
│   ├── arrow/                  # Navigation arrow component
│   └── badgeIndex/             # Index badge (e.g., "1/10")
├── hooks/
│   ├── useQueryManager.jsx     # Pagination state & data fetching logic (contains JSX)
│   ├── useSlider.js            # Swipe/drag gesture handling
│   ├── useOffset.js            # Translate offset calculations
│   ├── useLastTouch.js         # Touch position tracking
│   └── useRerenderOnWindowResize.js
├── primitives/                 # Reusable base components (Box, Button, FlexContainer) - .jsx files
├── icons/                      # SVG icon components (.jsx files)
├── utils/                      # Utility functions
└── stories/                    # Storybook documentation (.mdx files)

demo/                           # Demo app (Marvel API example)
dist/                           # Published package output (babel compiled)
public/                         # Webpack dev server output
```

## Path Aliases

Use these aliases for imports (configured in vite.config.js and vitest.config.js):

```javascript
import Component from '@components/componentName'
import Primitive from '@primitives/primitiveName'
import useHook from '@hooks/useHook'
import Icon from '@icons/IconName'
import { util } from '@utils'
```

## Commands

```bash
# Install dependencies
npm install

# Development
npm run dev             # Start dev server (Vite)
npm run storybook       # Start Storybook on port 6006

# Build
npm run build           # Production build for library (Vite)
npm run build:demo      # Build demo app

# Testing
npm test                # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage report

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Auto-fix lint issues
npm run format          # Format with Prettier

# Commits (uses commitizen)
npm run cm              # Interactive conventional commit prompt
```

## Coding Guidelines

### Component Pattern

- **One component per folder** with structure:
  ```
  componentName/
  ├── index.js              # Re-export only (or index.jsx if contains JSX)
  ├── componentName.jsx     # Component implementation (.jsx for files with JSX)
  ├── componentName.module.css
  └── componentName.test.jsx  # Test file (.jsx if contains JSX)
  ```
- Use **functional components** with hooks
- Wrap with `React.memo()` for performance where appropriate
- Always define **PropTypes** for component props
- Use `React.forwardRef` when refs need to be passed through

### Styling

- Use **CSS Modules** (files must end in `.module.css`)
- Import styles: `import styles from './component.module.css'`
- Use `classnames` library for conditional classes:
  ```javascript
  import classnames from 'classnames'
  className={classnames(styles.base, { [styles.active]: isActive })}
  ```

### Testing

- Test files live alongside components: `componentName.test.jsx` (use `.jsx` if test contains JSX)
- Uses Vitest with **snapshot testing**
- Use `@testing-library/react` for component and hook tests
- CSS modules handled by Vitest's CSS module support

### Code Style (Prettier enforced)

- No semicolons
- Single quotes
- 2-space indentation
- Trailing commas (ES5)
- 100 character line width
- Arrow function parens: avoid when possible

### Git Workflow

- **Pre-commit**: Runs `lint-staged` (ESLint fix on staged .js/.jsx)
- **Pre-push**: Runs tests (only if there are changes)
- **Commit messages**: Must follow [Conventional Commits](https://www.conventionalcommits.org/)
  - Types: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
  - Use `npm run cm` for interactive commit prompt

## Environment Setup

1. Ensure Node.js 20.x is installed (use `nvm use` if nvm is available)
2. Run `npm install` to install dependencies
3. Demo requires `VITE_MARVEL_API_KEY` in `demo/.env` (optional for development)

## Key Implementation Details

### Data Flow (ReactCarouselQuery)

1. `QueryManagerProvider` wraps carousel, manages fetch state
2. `useQueryManager` hook provides: `items`, `currentIndex`, `total`, `next`, `previous`
3. `getData` prop called automatically when approaching end of fetched items
4. Expected response format: `{ offset: number, total: number, items: { id: string|number }[] }`

### Gesture Handling

- `useSlider` hook handles all swipe/drag logic
- Supports both touch events (mobile) and mouse events (desktop)
- Calculates offset via `useOffset` hook
- Uses CSS `transform: translateX()` with transition for smooth animation

## Exports (Public API)

```javascript
// Default export
import ReactCarouselQuery from 'react-carousel-query'

// Named exports
import { ReactCarousel, useSlider } from 'react-carousel-query'
```

## Common Pitfalls

1. **JSX Extension**: Files containing JSX syntax must use `.jsx` extension - Vite requires this
2. **CSS Modules**: Regular `.css` files won't have scoped class names - must use `.module.css`
3. **Test environment**: Vitest uses jsdom; CSS modules are handled via `css.modules` config
4. **Path aliases**: Must be configured in vite.config.js and vitest.config.js
5. **Hook dependencies**: ESLint `react-hooks/exhaustive-deps` is set to warn
6. **Node version**: Package requires Node >=20.0.0 (see `.nvmrc`)
7. **Unused imports**: ESLint enforces `no-unused-vars` - don't import from vitest unless actually using it
8. **Line length**: Prettier enforces 100 character line width - keep test assertions on single lines when possible
