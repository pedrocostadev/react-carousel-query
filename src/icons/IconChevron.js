import React from 'react';
import PropTypes from 'prop-types';

const IconChevron = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 8 5"
    height="22px"
    stroke="currentColor"
    fill="none"
    fillRule="evenodd"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 1 3.77984472 4 6.53846154 1" />
  </svg>
);

IconChevron.propTypes = {
  className: PropTypes.string,
};

export default IconChevron;
