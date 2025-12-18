import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Box from '@primitives/box'

import styles from './flexContainer.module.css'

const FlexContainer = React.forwardRef(
  ({ children, alignCenter, justifyCenter, directionColumn, ...props }, ref) => {
    return (
      <Box
        {...props}
        ref={ref}
        className={classnames(
          styles.flexDisplay,
          { [styles.alignCenter]: alignCenter },
          { [styles.justifyCenter]: justifyCenter },
          { [styles.directionColumn]: directionColumn }
        )}
      >
        {children}
      </Box>
    )
  }
)

FlexContainer.displayName = 'FlexContainer'

FlexContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  alignCenter: PropTypes.bool,
  justifyCenter: PropTypes.bool,
  directionColumn: PropTypes.bool,
}

export default React.memo(FlexContainer)
