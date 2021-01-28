import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './badgeIndex.module.css';

const BadgeIndex = ({
  currentIndex,
  total,
  renderBadge,
  className,
  ...props
}) => {
  if (typeof renderBadge === 'function') {
    return renderBadge(currentIndex, total);
  }

  return (
    <span {...props} className={classnames(styles.badgeIndex, className)}>
      {currentIndex}/{total}
    </span>
  );
};

BadgeIndex.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  className: PropTypes.string,
  renderBadge: PropTypes.func,
};

export default React.memo(BadgeIndex);
