import React from 'react';
import PropTypes from 'prop-types';

import CarouselItemsContainer from '@components/carouselItemsContainer';
import { QueryManagerProvider } from '@hooks/useQueryManager';
import Box from '@primitives/box';

const ReactCarouselQuery = ({ renderItem, getData, fetchStep }) => {
  return (
    <QueryManagerProvider getData={getData} fetchStep={fetchStep}>
      <Box positionRelative overflowHidden fullWidth fullHeight>
        <CarouselItemsContainer renderItem={renderItem} />
      </Box>
    </QueryManagerProvider>
  );
};

ReactCarouselQuery.propTypes = {
  renderItem: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  fetchStep: PropTypes.number,
};

export default ReactCarouselQuery;
