import React from 'react';

import useOffset from '@hooks/useOffset';
import useLastTouch from '@hooks/useLastTouch';

const HALF_SECOND = 500;
const TRANSITON_SNAP_DURATION = HALF_SECOND + 100;

const useSlider = ({ containerRef, next, previous, currentIndex, total }) => {
  const itemWidth = containerRef.current && containerRef.current.offsetWidth;

  const {
    offset,
    maxOffset,
    setOffset,
    setNextOffset,
    setPreviousOffset,
    decreaseOffset,
    increaseOffset,
  } = useOffset({
    currentIndex,
    itemWidth,
    total,
  });

  const { setLastTouch, resetLastTouch, getTouchDelta } = useLastTouch();

  const [transitionDuration, setTransitionDuration] = React.useState('0s');

  const resetTransitionDuration = () =>
    setTimeout(() => setTransitionDuration('0s'), TRANSITON_SNAP_DURATION);

  const onMovement = (delta) => {
    setOffset((currentOffset) => {
      let nextOffset = currentOffset + delta;
      const isNegativeOffset = nextOffset < 0;
      const isInvalidOffset = nextOffset > maxOffset;

      if (isNegativeOffset) {
        return 0;
      }

      if (isInvalidOffset) {
        return maxOffset;
      }

      return nextOffset;
    });
  };

  const onMovementEnd = () => {
    const endPosition = offset / itemWidth;
    const endPartial = endPosition % 1;

    setTransitionDuration('0.5s');

    const isSwipeNext = endPosition - currentIndex > 0.5;
    if (isSwipeNext) {
      setNextOffset(currentIndex);
      next();
      resetTransitionDuration();
      return;
    }

    const endingIndex = endPosition - endPartial;
    const deltaInteger = endingIndex - currentIndex;
    const isSwipePrevious = deltaInteger === -1;
    const isFirstItem = currentIndex === 0;

    if (isSwipePrevious && !isFirstItem) {
      setPreviousOffset(currentIndex);
      previous();
      resetTransitionDuration();
      return;
    }

    setOffset(() => currentIndex * itemWidth);
    resetTransitionDuration();
  };

  const onTouchStart = (evt) => {
    setLastTouch(evt);
  };

  const onTouchMove = (evt) => {
    const delta = getTouchDelta(evt);
    setLastTouch(evt);
    onMovement(delta);
  };

  const onTouchEnd = () => {
    onMovementEnd();
    resetLastTouch();
  };

  const onNext = () => {
    next();
    increaseOffset();
  };

  const onPrevious = () => {
    previous();
    decreaseOffset();
  };

  const [isDragging, setIsDragging] = React.useState(false);

  const onMouseDown = (evt) => {
    setIsDragging(true);
    onTouchStart(evt);
  };

  const onMouseUp = (evt) => {
    setIsDragging(false);
    onTouchEnd(evt);
  };

  const onMouseMove = (evt) => {
    if (!isDragging) {
      return;
    }
    onTouchMove(evt);
  };

  const onMouseLeave = (evt) => {
    if (!isDragging) {
      return;
    }
    onMouseUp(evt);
  };

  return {
    transitionDuration,
    offset,
    events: {
      onMouseLeave,
      onMouseMove,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
    },
    onNext,
    onPrevious,
  };
};

export default useSlider;
