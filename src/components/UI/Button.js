// Button.js

import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, label, }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {label} 
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
