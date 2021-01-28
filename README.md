# react-carousel-query

react-carousel-query is a:
- React Component
- Infinite Carousel 
- Dependencies free (only React)
- Allow you to render slides as you wish
- Handles the pagination request for you but you can also use local resources

Demo [here](https://react-carousel-query.vercel.app/)
## How to use

- Import

```
import ReactCarouselQuery from 'react-carousel-query';
```

- Instantiate it

```
  <ReactCarouselQuery 
    hideIndex
    fetchStep={5}
    renderBadge={(currentIndex,total) => <span>currentIndex - total</span>}
    renderItem={renderItem}
    getData={getData}
  />
```
### Props
- `fetchStep`: Number of items requested in each GET call (optional, default is 3)
- `hideIndex`: Avoid displaying the index on top right corner (optional, default is false)
- `renderBadge`: Render the bash as you wish. (optional)
- `renderItem`: Render each slide as you wish!
- `getData`: Async function that should return the fetched items. Should respect the following format:
```
{ offset: number; total: number; items: { id }[] }
```

Still don't know how to use it? See the demo source code [here](https://github.com/pedrocostadev/react-carousel-query/blob/main/demo/index.js)!

### Setup
- `yarn` on root folder
### How to run

- `yarn start:dev` or `yarn start`

### How to build

- `yarn build` or `yarn build:dev`

### Contributions

Contributions are welcome. Just open a PR and feel free to contact me :-).