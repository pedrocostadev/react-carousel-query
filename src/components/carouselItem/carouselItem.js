import React from 'react';
import PropTypes from 'prop-types';

import Box from '@primitives/box';

const CarouselItem = ({ item, renderItem }) => (
  <Box fullMaxHeight fullHeight fullWidth fullMinWidth>
    {renderItem(item)}
  </Box>
);

CarouselItem.propTypes = {
  item: PropTypes.object, // TODO: fix
  renderItem: PropTypes.func.isRequired,
};

export default CarouselItem;
