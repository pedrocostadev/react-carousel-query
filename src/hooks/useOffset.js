import React from 'react';

const useOffset = ({ itemWidth, total }) => {
  const [offset, setOffset] = React.useState(0);

  const maxOffset = (total - 1) * itemWidth;

  const increaseOffset = () =>
    setOffset((currentOffset) => {
      const newOffset = currentOffset + itemWidth;
      if (newOffset > maxOffset) {
        return currentOffset;
      }
      return currentOffset + itemWidth
    })

  const decreaseOffset = () =>
    setOffset((currentOffset) => {
      if (currentOffset === 0) {
        return currentOffset;
      }
      return currentOffset - itemWidth;
    });

  const setNextOffset = (currentIndex) =>
    setOffset((currentIndex + 1) * itemWidth);

  const setPreviousOffset = (currentIndex) =>
    setOffset((currentIndex - 1) * itemWidth);

  return {
    offset,
    maxOffset,
    setOffset,
    increaseOffset,
    decreaseOffset,
    setNextOffset,
    setPreviousOffset,
  };
};

export default useOffset;
