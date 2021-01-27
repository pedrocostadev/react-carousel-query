import React from 'react';
import PropTypes from 'prop-types';

import CarouselItemsContainer from '@components/CarouselItemsContainer';

import Box from '@primitives/box';

const MobileCarousel = ({ renderItem }) => {
  return (
    <Box positionRelative overflowHidden fullWidth fullHeight>
      <CarouselItemsContainer renderItem={renderItem} />
    </Box>
  );
};

MobileCarousel.propTypes = {
  renderItem: PropTypes.func.isRequired,
};

export default MobileCarousel;
