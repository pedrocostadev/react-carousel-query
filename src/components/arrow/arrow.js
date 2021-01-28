import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import IconChevron from '@icons/IconChevron';
import Button from '@primitives/button';

import styles from './arrow.module.css';

const Arrow = ({ variant, ...buttonProps }) => (
  <Button
    {...buttonProps}
    className={classnames(styles.arrowButton, styles[variant])}
  >
    <IconChevron />
  </Button>
);

Arrow.propTypes = {
  variant: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default React.memo(Arrow);
