import React from 'react'
import PropTypes from 'prop-types'

import CarouselItemsContainer from '@components/carouselItemsContainer'
import CarouselItem from '@components/carouselItem'
import Box from '@primitives/box'

const ReactCarousel = ({ children, ...props }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const next = React.useCallback(() => setCurrentIndex(currentIndex => currentIndex + 1), [])
  const previous = React.useCallback(() => setCurrentIndex(currentIndex => currentIndex - 1), [])
  const total = children.length
  return (
    <Box positionRelative overflowHidden fullWidth fullHeight>
      <CarouselItemsContainer
        currentIndex={currentIndex}
        next={next}
        previous={previous}
        total={total}
        {...props}
      >
        {React.Children.map(children, child => (
          <CarouselItem>{child}</CarouselItem>
        ))}
      </CarouselItemsContainer>
    </Box>
  )
}

ReactCarousel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default ReactCarousel
