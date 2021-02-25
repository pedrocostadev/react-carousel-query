import React from 'react';
import PropTypes from 'prop-types';

import { QueryManagerProvider } from '@hooks/useQueryManager';

import ReactCarouselQuery from './reactCarouselQuery';

const ReactCarouselQueryWrapper = ({ getData, fetchStep, ...props }) => (
  <QueryManagerProvider getData={getData} fetchStep={fetchStep}>
    <ReactCarouselQuery {...props} />
  </QueryManagerProvider>
);

ReactCarouselQueryWrapper.propTypes = {
  getData: PropTypes.func.isRequired,
  fetchStep: PropTypes.number,
};

export default ReactCarouselQueryWrapper;
