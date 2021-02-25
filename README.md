# react-carousel-query

[![NPM](https://nodei.co/npm/react-carousel-query.png)](https://npmjs.org/package/react-carousel-query)

- React Component
- Developed to be used as a Infinite Carousel but can be used also with limited resources
- Handles the pagination requests for you
- Dependencies free (only React)
- Allow you to render slides as you wish
- Ensures a good performance
- Prepared for mobile and desktop
- TypeScript declarations included
- Customizable

Demo [here](https://react-carousel-query.vercel.app/)

![Screenshot](./screenshots/demo.gif)

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
- `yarn` on root folder


## How to run

- `yarn start:dev` or `yarn start`


## How to build

- `yarn build` or `yarn build:dev`


## Contributions

Contributions are welcome. Just open a PR and feel free to contact me :-).

You can also start looking into ope issues, specially the ones with `good first issue` label.


## ToDo

- Storybook (soon)