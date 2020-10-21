import React from 'react';
import PropTypes from 'prop-types';

export const Footer = ({ todos, clearCompletedItem, filtered, filterName }) => (
  <footer className="footer">
    <span className="todo-count">
      {todos.filter(todo => !todo.completed).length}
      &#160;

      items left
    </span>

    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filterName === 'all' ? 'selected' : ''}
          onClick={() => filtered('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={filterName === 'active' ? 'selected' : ''}
          onClick={() => filtered('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={filterName === 'completed' ? 'selected' : ''}
          onClick={() => filtered('completed')}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={clearCompletedItem}
    >
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  filterName: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearCompletedItem: PropTypes.func.isRequired,
  filtered: PropTypes.func.isRequired,
};
