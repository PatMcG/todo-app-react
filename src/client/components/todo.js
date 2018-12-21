import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  id: React.PropTypes.string,
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickTodo: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
  archive: React.PropTypes.bool,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  id: '',
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
  archive: false,
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickTodo, onClickArchive, status, text, archive}) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  const archiveButtonText = archive ? 'Archived' : 'Archive';

  return (
    <li className={todoCls}>
      <input type="checkbox" defaultChecked={status === 'complete'}></input>
      <span className="checkmark"></span>
      <TodoLink text={text} onClick={onClickTodo} />
      <Button type="archive" text={archiveButtonText} show={status === 'complete'} onClick={onClickArchive} />
      <Button type="delete" text="x" onClick={onClickDelete} />
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
