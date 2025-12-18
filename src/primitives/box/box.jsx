import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './box.module.css'

const Box = React.forwardRef(
  (
    {
      children,
      className,
      fullHeight,
      fullWidth,
      fullMaxHeight,
      fullMaxWidth,
      fullMinWidth,
      positionRelative,
      overflowHidden,
      ...props
    },
    ref
  ) => (
    <div
      {...props}
      ref={ref}
      className={classnames(
        styles.container,
        className,
        { [styles.fullHeight]: fullHeight },
        { [styles.fullWidth]: fullWidth },
        { [styles.fullMaxHeight]: fullMaxHeight },
        { [styles.fullMaxWidth]: fullMaxWidth },
        { [styles.fullMinWidth]: fullMinWidth },
        { [styles.positionRelative]: positionRelative },
        { [styles.overflowHidden]: overflowHidden }
      )}
    >
      {children}
    </div>
  )
)

Box.displayName = 'Box'

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullMaxHeight: PropTypes.bool,
  fullMaxWidth: PropTypes.bool,
  fullMinWidth: PropTypes.bool,
  positionRelative: PropTypes.bool,
  overflowHidden: PropTypes.bool,
}

export default React.memo(Box)
