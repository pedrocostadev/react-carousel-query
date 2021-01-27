import React from 'react';
import PropTypes from 'prop-types';

const IconLoading = ({ className }) => (
  <svg width="40" height="40" className={className}>
    <path
      opacity=".2"
      d="M20.201 5.169A14.95 14.95 0 0 0 5.255 20.115a14.95 14.95 0 0 0 14.946 14.946 14.95 14.95 0 0 0 14.946-14.946A14.95 14.95 0 0 0 20.201 5.169zm0 26.58c-6.425 0-11.634-5.208-11.634-11.634S13.776 8.481 20.201 8.481s11.633 5.209 11.633 11.634-5.208 11.634-11.633 11.634z"
    />
    <path d="M26.013 10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312a11.57 11.57 0 0 1 5.812 1.566z">
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

IconLoading.propTypes = {
  className: PropTypes.string,
};

export default IconLoading;
