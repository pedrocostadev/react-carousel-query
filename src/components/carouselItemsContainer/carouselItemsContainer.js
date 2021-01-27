import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from '@primitives/flexContainer';
import CarouselItem from '@components/carouselItem';
import Arrow from '@components/arrow';
import { useQueryManager } from '@hooks/useQueryManager';
import useOffset from '@hooks/useOffset';

import styles from './carouselItemsContainer.module.css';

const CarouselItemsContainer = ({ renderItem }) => {
  const containerRef = React.useRef(null);

  const [transitionDuration, setTransitionDuration] = React.useState('0s');
  const resetTransitionDuration = () =>
    setTimeout(() => setTransitionDuration('0s'), 600);

  const getImgWidth = () =>
    containerRef.current && containerRef.current.offsetWidth;

  const { currentIndex, total, items, next, previous } = useQueryManager();
  const {
    offset,
    lastTouch,
    setOffset,
    setLastTouch,
    resetLastTouch,
    setNextOffset,
    setPreviousOffset,
    decreaseOffset,
    increaseOffset,
  } = useOffset({
    itemWidth: getImgWidth(),
  });

  const getMaxOffset = React.useCallback(() => total * getImgWidth(), [total]);

  const onMovement = (delta) => {
    setOffset((currentOffset) => {
      let nextOffset = currentOffset + delta;
      const isNegativeOffset = nextOffset < 0;
      const isInvalidOffset = nextOffset > getMaxOffset();

      if (isNegativeOffset) {
        return 0;
      }

      if (isInvalidOffset) {
        return getMaxOffset();
      }

      return nextOffset;
    });
  };

  const onMovementEnd = () => {
    const endPosition = offset / getImgWidth();
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

    setOffset(() => currentIndex * getImgWidth());
    resetTransitionDuration();
  };

  const onTouchStart = (evt) => {
    setLastTouch(evt);
  };

  const onTouchMove = (evt) => {
    const delta = lastTouch - evt.nativeEvent.touches[0].clientX;
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
  return (
    <>
      <Arrow variant="left" onClick={onPrevious} />
      <FlexContainer
        ref={containerRef}
        fullHeight
        alignCenter
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={styles.container}
        style={{
          transform: `translateX(${offset * -1}px)`,
          transitionDuration,
        }}
      >
        {items.map((item) => (
          <CarouselItem key={item.id} item={item} renderItem={renderItem} />
        ))}
      </FlexContainer>
      <Arrow variant="right" onClick={onNext} />
    </>
  );
};

CarouselItemsContainer.propTypes = {
  renderItem: PropTypes.func.isRequired,
};

export default CarouselItemsContainer;
