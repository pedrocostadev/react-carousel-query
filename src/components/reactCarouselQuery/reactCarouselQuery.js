import React from 'react'
import PropTypes from 'prop-types'

import CarouselItemsContainer from '@components/carouselItemsContainer'
import CarouselItem from '@components/carouselItem'
import { useQueryManager } from '@hooks/useQueryManager'
import Box from '@primitives/box'

const ReactCarouselQuery = ({ renderItem, ...props }) => {
  const { currentIndex, total, items, next, previous } = useQueryManager()
  return (
    <Box positionRelative overflowHidden fullWidth fullHeight>
      <CarouselItemsContainer
        {...props}
        currentIndex={currentIndex}
        total={total}
        items={items}
        next={next}
        previous={previous}
      >
        {items.map(item => (
          <CarouselItem key={item.id} item={item} renderItem={renderItem} />
        ))}
      </CarouselItemsContainer>
    </Box>
  )
}

ReactCarouselQuery.propTypes = {
  renderItem: PropTypes.func.isRequired,
  renderBadge: PropTypes.func,
  renderArrow: PropTypes.func,
  hideIndex: PropTypes.bool,
  showArrows: PropTypes.bool,
}

export default ReactCarouselQuery
