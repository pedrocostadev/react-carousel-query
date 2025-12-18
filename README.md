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

Demo [here](https://react-carousel-query.vercel.app/)

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

const App = () => (
  <ReactCarouselQuery
    renderItem={({ item }) => <img src={item.imgSrc} alt={item.name} />}
    getData={getData}
  />
)
```

## Props

- `fetchStep`: Number of items requested in each GET call (optional, default is 3)
- `hideIndex`: Avoid displaying the index on top right corner (optional, default is false)
- `showArrows`: Show arrows (optional, default is false). Passing the `renderArrow` prop also makes the arrows to render.
- `renderBadge`: Render the badge component as you wish. (optional)
- `renderArrow`: Render the arrow component as you wish. (optional, see [example](https://repl.it/@pedrocostadev/react-carousel-query-custom-arrows))
- `renderItem`: Render each slide as you wish!
- `getData`: Async function that should return the fetched items. Should respect the following format:

```
{ offset: number; total: number; items: { id }[] }
```

```
const getData = async ({ offset, limit }) => {
  const url = `http://someApi.com?offset=${offset}&limit=${limit}`;
  const { data } = await (await fetch(url)).json();
  return {
    offset: data.offset,
    total,
    items: data.results.map(item => ({...item, id: item.name })),
  };
};
```

## How to use

- [Check how to get the items from an API in our demo code](https://github.com/pedrocostadev/react-carousel-query/blob/main/demo/index.js)

- [Using with limited resources](https://repl.it/@pedrocostadev/react-carousel-query#src/App.js)

- [Using without the query manager](https://repl.it/@pedrocostadev/react-carousel#src/App.js)

- [Render custom arrows](https://repl.it/@pedrocostadev/react-carousel-query-custom-arrows#src/App.js)

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
