import React from 'react'
import PropTypes from 'prop-types'

import Box from '@primitives/box'

const CarouselItem = ({ item, renderItem, children, index, total }) => (
  <Box
    fullMaxHeight
    fullHeight
    fullWidth
    fullMinWidth
    role="group"
    aria-roledescription="slide"
    aria-label={total ? `${index} of ${total}` : undefined}
  >
    {children || renderItem({ item })}
  </Box>
)

CarouselItem.propTypes = {
  item: PropTypes.object,
  renderItem: PropTypes.func,
  children: PropTypes.node,
  index: PropTypes.number,
  total: PropTypes.number,
}

export default React.memo(CarouselItem)
