# react-carousel-query

[![NPM](https://nodei.co/npm/react-carousel-query.png)](https://npmjs.org/package/react-carousel-query)

[![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

| Statements                                                                                      | Branches                                                                                      | Functions                                                                                      | Lines                                                                                      |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/Coverage-98.58%25-brightgreen.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-97.29%25-brightgreen.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-95.23%25-brightgreen.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-98.58%25-brightgreen.svg 'Make me better!') |

- Lightweight React component with minimal footprint
- Infinite carousel with automatic pagination management
- Fetches data on demand as users navigate through slides
- Zero external dependencies (only React and classnames)
- Fully customizable slide, arrow, and badge rendering
- Optimized for performance
- Touch and mouse swipe support for mobile and desktop
- TypeScript declarations included

Working demo [here](https://react-carousel-query.vercel.app/)

![Screenshot](./screenshots/demo.gif)

## Installation

**Requirements:** React 16.8.0 or higher

```bash
npm install react-carousel-query
```

## Usage

```jsx
import ReactCarouselQuery from 'react-carousel-query'
import 'react-carousel-query/styles.css' // Required for styles

const getData = async ({ offset, limit }) => {
  const response = await fetch(`https://api.example.com/items?offset=${offset}&limit=${limit}`)
  const { data } = await response.json()
  return {
    offset: data.offset,
    total: data.total,
    items: data.results.map(item => ({ ...item, id: item.name })),
  }
}

const App = () => (
  <ReactCarouselQuery
    renderItem={({ item }) => <img src={item.imgSrc} alt={item.name} />}
    getData={getData}
  />
)
```

For a complete working example, check out our [demo code](https://github.com/pedrocostadev/react-carousel-query/blob/main/demo/index.js).

## Props

| Prop          | Type       | Default      | Description                                                                                                                |
| ------------- | ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `renderItem`  | `function` | **required** | Render function for each slide. Receives `{ item }` as argument. You can render just an img or any other React element.    |
| `getData`     | `function` | **required** | Async function to fetch items. Must return `{ offset, total, items }`.                                                     |
| `fetchStep`   | `number`   | `3`          | Number of items requested per fetch call. Data is fetched preemptively as the user navigates, ensuring smooth transitions. |
| `hideIndex`   | `boolean`  | `false`      | Hide the index badge in the top right corner.                                                                              |
| `showArrows`  | `boolean`  | `false`      | Show navigation arrows. Also enabled when `renderArrow` is provided.                                                       |
| `renderArrow` | `function` | `undefined`  | Custom render function for arrows.                                                                                         |
| `renderBadge` | `function` | `undefined`  | Custom render function for the index badge.                                                                                |

### getData Response Format

The `getData` function receives `{ offset, limit }` and must return an object with:

```ts
{
  offset: number   // Current offset position
  total: number    // Total number of items available
  items: Array<{ id: string | number, ...rest }>  // Array of items (each must have a unique id)
}
```

## Setup

```bash
npm install
```

## How to run

```bash
npm run dev
```

## How to build

```bash
npm run build
```

## How to test

```bash
npm test
```

## Contributions

Contributions are welcome. Just open a PR and feel free to contact me :-).

You can also start looking into ope issues, specially the ones with `good first issue` label.

## Documentation

Run Storybook for interactive documentation:

```bash
npm run storybook
```
