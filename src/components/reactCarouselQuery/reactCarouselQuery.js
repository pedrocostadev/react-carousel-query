import React from 'react';
import PropTypes from 'prop-types';

import CarouselItemsContainer from '@components/carouselItemsContainer';
import { QueryManagerProvider } from '@hooks/useQueryManager';
import useRerenderOnWindowResize from '@hooks/useRerenderOnWindowResize';
import Box from '@primitives/box';

const ReactCarouselQuery = ({ getData, fetchStep, ...props }) => {
  useRerenderOnWindowResize();
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
  showArrowsOnMobile: PropTypes.bool,
};

export default ReactCarouselQuery;
