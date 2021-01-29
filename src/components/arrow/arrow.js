import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import IconChevron from '@icons/IconChevron';
import Button from '@primitives/button';

import styles from './arrow.module.css';

const Arrow = ({ variant, showOnMobile, ...buttonProps }) => (
  <Button
    {...buttonProps}
    className={classnames(styles.arrowButton, styles[variant], {
      [styles.showOnMobile]: showOnMobile,
    })}
  >
    <IconChevron />
  </Button>
);

Arrow.propTypes = {
  variant: PropTypes.oneOf(['left', 'right']).isRequired,
  showOnMobile: PropTypes.bool,
};

export default React.memo(Arrow);
