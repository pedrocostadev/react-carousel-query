import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import FlexContainer from '@primitives/flexContainer'
import Arrow from '@components/arrow'
import BadgeIndex from '@components/badgeIndex'
import useSlider from '@hooks/useSlider'
import useRerenderOnWindowResize from '@hooks/useRerenderOnWindowResize'

import styles from './carouselItemsContainer.module.css'

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
  ariaLabel = 'Carousel',
}) => {
  useRerenderOnWindowResize()
  const containerRef = React.useRef(null)

  const { events, onNext, onPrevious, offset, transitionDuration, onKeyDown } = useSlider({
    containerRef,
    next,
    previous,
    currentIndex,
    total,
  })

  const shouldRenderArrows = showArrows || renderArrow

  const containerStyle = React.useMemo(
    () => ({
      transform: `translateX(${offset * -1}px)`,
      transitionDuration,
    }),
    [offset, transitionDuration]
  )

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className={styles.carouselSection}
    >
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
        style={containerStyle}
        aria-live="off"
      >
        {children}
      </FlexContainer>
      {shouldRenderArrows && <Arrow renderArrow={renderArrow} variant="right" onClick={onNext} />}
    </section>
  )
}

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
  ariaLabel: PropTypes.string,
}

export default CarouselItemsContainer
