import React from 'react';
import PropTypes from 'prop-types';

import CarouselItemsContainer from '@components/carouselItemsContainer';
import { QueryManagerProvider } from '@hooks/useQueryManager';
import Box from '@primitives/box';

const MobileCarousel = ({ renderItem, getData }) => {
  return (
    <QueryManagerProvider getData={getData}>
      <Box positionRelative overflowHidden fullWidth fullHeight>
        <CarouselItemsContainer renderItem={renderItem} />
      </Box>
    </QueryManagerProvider>
  );
};

MobileCarousel.propTypes = {
  renderItem: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default MobileCarousel;
