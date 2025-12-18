import React from 'react'
import PropTypes from 'prop-types'

import Box from '@primitives/box'

const CarouselItem = ({ item, renderItem, children }) => (
  <Box fullMaxHeight fullHeight fullWidth fullMinWidth>
    {children || renderItem({ item })}
  </Box>
)

CarouselItem.propTypes = {
  item: PropTypes.object,
  renderItem: PropTypes.func,
  children: PropTypes.node,
}

export default React.memo(CarouselItem)
