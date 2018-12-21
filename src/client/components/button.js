import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
  type: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
  type: '',
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ text, onClick, show=true, type}) => {
  /**
   * Base CSS class
   */
  const baseCls = 'button';
  const buttonCls = baseCls + (type ? ` ${type}` : '');

  return (
    show ?
    <button className={buttonCls} onClick={onClick}>
      {text}
    </button> : null
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
