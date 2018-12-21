import React from 'react';
import { Link, IndexLink} from 'react-router';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: React.PropTypes.string,
  onClickFilter: React.PropTypes.func,
  onClickArchiveAll: React.PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
  onClickArchiveAll: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter, onClickArchiveAll }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <div className='nav-items'>
      <IndexLink
        to="/"
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
        onClick={() => onClickFilter('')}
      >
        All
      </IndexLink>
      <Link
        to="/active"
        className={activeLinkCls}
        onClick={() => onClickFilter('active')}
      >
        Active
      </Link>
      <Link
        to="/completed"
        className={completedLinkCls}
        onClick={() => onClickFilter('completed')}
      >
        Completed
      </Link>
      <Link
        to="/archived"
        className={archivedLinkCls}
        onClick={() => onClickFilter('archived')}
      >
        Archived
      </Link>
      </div>
      <Button type="archive-all" text="Archive all completed" onClick={onClickArchiveAll} />
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
