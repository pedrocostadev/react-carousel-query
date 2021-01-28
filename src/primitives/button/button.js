import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Button);
