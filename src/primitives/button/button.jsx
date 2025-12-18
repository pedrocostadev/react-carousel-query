import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, type = 'button', ...rest }) => {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

export default React.memo(Button)
