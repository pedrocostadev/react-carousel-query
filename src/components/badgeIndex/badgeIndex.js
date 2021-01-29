import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './badgeIndex.module.css';

const ELEVEN_SECONDS = 11000;

const BadgeIndex = ({
  currentIndex,
  total,
  renderBadge,
  className,
  ...props
}) => {
  if (typeof renderBadge === 'function') {
    return renderBadge({ currentIndex, total });
  }

  const [showAnimation, setShowAnimation] = React.useState(false);

  const hideAnimation = () =>
    setTimeout(() => setShowAnimation(false), ELEVEN_SECONDS);

  React.useLayoutEffect(() => {
    setShowAnimation(true);
    const timeout = hideAnimation();
    return () => clearTimeout(timeout);
  }, [currentIndex, total]);

  return (
    <span
      {...props}
      className={classnames(
        styles.badgeIndex,
        { [styles.fadeInFadeOut]: showAnimation },
        className,
      )}
    >
      {currentIndex}
      {total ? `/${total}` : ''}
    </span>
  );
};

BadgeIndex.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  total: PropTypes.number,
  className: PropTypes.string,
  renderBadge: PropTypes.func,
};

export default React.memo(BadgeIndex);
