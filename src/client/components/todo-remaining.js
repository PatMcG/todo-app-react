import React from 'react';
import Button from './button';

/**
 * Prop Types
 * @private
 */
const propTypes = {
    remainingTodos: React.PropTypes.number,
  };
  
  /**
   * Default Props
   * @private
   */
  const defaultProps = {
    remainingTodos: 0,
  };

/**
 * Tasks Remaining component
 */
const TodoRemaining = ({remainingTodos, onClickCompleteAll}) => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'remaining-todos';

  return (
    <div className={baseCls}>
    <span>{remainingTodos} tasks remaining</span>
    <Button type="complete" text="Complete All" onClick={onClickCompleteAll}></Button>
    </div>
  )
};

TodoRemaining.propTypes = propTypes;
TodoRemaining.defaultProps = defaultProps;

export default TodoRemaining;
