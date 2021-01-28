import React from 'react';
import PropTypes from 'prop-types';

import CarouselItemsContainer from '@components/carouselItemsContainer';
import { QueryManagerProvider } from '@hooks/useQueryManager';
import useRerenderOnWindowSize from '@hooks/useRerenderOnWindowSize';
import Box from '@primitives/box';

const ReactCarouselQuery = ({ getData, fetchStep, ...props }) => {
  useRerenderOnWindowSize();
  return (
    <QueryManagerProvider getData={getData} fetchStep={fetchStep}>
      <Box positionRelative overflowHidden fullWidth fullHeight>
        <CarouselItemsContainer {...props} />
      </Box>
    </QueryManagerProvider>
  );
};

ReactCarouselQuery.propTypes = {
  renderItem: PropTypes.func.isRequired,
  renderBadge: PropTypes.func,
  getData: PropTypes.func.isRequired,
  fetchStep: PropTypes.number,
  hideIndex: PropTypes.bool,
};

export default ReactCarouselQuery;
