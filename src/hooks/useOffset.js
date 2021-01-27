import React from 'react';

const useOffset = ({ itemWidth }) => {
  const [state, setState] = React.useState({
    lastTouch: undefined,
    offset: 0,
  });

  const setOffset = (getOffset) =>
    setState((currentState) => {
      const newOffset = getOffset(currentState.offset);
      return {
        ...currentState,
        offset: newOffset,
      };
    });

  const increaseOffset = () =>
    setState((currentState) => ({
      ...currentState,
      offset: currentState.offset + itemWidth,
    }));

  const decreaseOffset = () =>
    setState((currentState) => {
      if (currentState.offset === 0) {
        return currentState;
      }
      return {
        ...currentState,
        offset: currentState.offset - itemWidth,
      };
    });

  const setNextOffset = (currentIndex) =>
    setOffset(() => (currentIndex + 1) * itemWidth);

  const setPreviousOffset = (currentIndex) =>
    setOffset(() => (currentIndex - 1) * itemWidth);

  const setLastTouch = ({ nativeEvent }) =>
    setState((currentState) => ({
      ...currentState,
      lastTouch: nativeEvent.touches[0].clientX,
    }));

  const resetLastTouch = () =>
    setState((currentState) => ({
      ...currentState,
      lastTouch: 0,
    }));

  return {
    ...state,
    setOffset,
    increaseOffset,
    decreaseOffset,
    setNextOffset,
    setPreviousOffset,
    setLastTouch,
    resetLastTouch,
  };
};

export default useOffset;
