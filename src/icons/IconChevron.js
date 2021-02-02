import React from 'react';
import PropTypes from 'prop-types';

const IconChevron = ({ className }) => (
  <svg
    className={className}
    viewBox="-.2 -.3 8 5"
    height="15"
    width="40"
    stroke="currentColor"
    fill="none"
    fillRule="evenodd"
    strokeLinecap="round"
    strokeLinejoin="round"
    preserveAspectRatio="xMidYMax meet"
  >
    <polyline points="1 1 3.77984472 4 6.53846154 1" />
  </svg>
);

IconChevron.propTypes = {
  className: PropTypes.string,
};

export default React.memo(IconChevron);
