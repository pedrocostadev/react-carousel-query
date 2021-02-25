import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FlexContainer from '@primitives/flexContainer';
import CarouselItem from '@components/carouselItem';
import Arrow from '@components/arrow';
import BadgeIndex from '@components/badgeIndex';
import { useQueryManager } from '@hooks/useQueryManager';
import useOffset from '@hooks/useOffset';
import useLastTouch from '@hooks/useLastTouch';

import styles from './carouselItemsContainer.module.css';

const HALF_SECOND = 500;
const TRANSITON_SNAP_DURATION = HALF_SECOND + 100;

const CarouselItemsContainer = ({
  renderArrow,
  renderItem,
  renderBadge,
  hideIndex,
  showArrows,
}) => {
  const containerRef = React.useRef(null);

  const [transitionDuration, setTransitionDuration] = React.useState('0s');

  const resetTransitionDuration = () =>
    setTimeout(() => setTransitionDuration('0s'), TRANSITON_SNAP_DURATION);

  const { setLastTouch, resetLastTouch, getTouchDelta } = useLastTouch();

  const itemWidth = containerRef.current && containerRef.current.offsetWidth;

  const { currentIndex, total, items, next, previous } = useQueryManager();
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

  return (
    <>
      {!hideIndex && (
        <BadgeIndex
          renderBadge={renderBadge}
          className={classnames(styles.badgeIndex)}
          currentIndex={currentIndex + 1}
          total={total}
        />
      )}
      {showArrows && (
        <Arrow renderArrow={renderArrow} variant="left" onClick={onPrevious} />
      )}
      <FlexContainer
        ref={containerRef}
        fullHeight
        alignCenter
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
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
      {showArrows && (
        <Arrow renderArrow={renderArrow} variant="right" onClick={onNext} />
      )}
    </>
  );
};

CarouselItemsContainer.propTypes = {
  renderArrow: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  renderBadge: PropTypes.func,
  hideIndex: PropTypes.bool,
  showArrows: PropTypes.bool,
};

export default CarouselItemsContainer;
