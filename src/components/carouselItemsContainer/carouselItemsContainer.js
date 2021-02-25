import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FlexContainer from '@primitives/flexContainer';
import Arrow from '@components/arrow';
import BadgeIndex from '@components/badgeIndex';
import useSlider from '@hooks/useSlider';
import useRerenderOnWindowResize from '@hooks/useRerenderOnWindowResize';

import styles from './carouselItemsContainer.module.css';

const CarouselItemsContainer = ({
  renderArrow,
  renderBadge,
  hideIndex,
  showArrows,
  currentIndex,
  total,
  next,
  previous,
  children,
}) => {
  useRerenderOnWindowResize();
  const containerRef = React.useRef(null);

  const { events, onNext, onPrevious, offset, transitionDuration } = useSlider({
    containerRef,
    next,
    previous,
    currentIndex,
    total,
  });

  const shouldRenderArrows = showArrows || renderArrow;

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
      {shouldRenderArrows && (
        <Arrow renderArrow={renderArrow} variant="left" onClick={onPrevious} />
      )}
      <FlexContainer
        {...events}
        ref={containerRef}
        fullHeight
        alignCenter
        className={styles.container}
        style={{
          transform: `translateX(${offset * -1}px)`,
          transitionDuration,
        }}
      >
        {children}
      </FlexContainer>
      {shouldRenderArrows && (
        <Arrow renderArrow={renderArrow} variant="right" onClick={onNext} />
      )}
    </>
  );
};

CarouselItemsContainer.propTypes = {
  renderArrow: PropTypes.func,
  renderBadge: PropTypes.func,
  hideIndex: PropTypes.bool,
  showArrows: PropTypes.bool,
  currentIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default CarouselItemsContainer;
