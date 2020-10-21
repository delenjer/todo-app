import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos, HandleCheckedItem, destroyItem }) => (
  <ul className="todo-list">
    {
      todos.map(todo => (
        <li key={todo.id}>
          <div className="view">
            <input
              id={todo.id}
              type="checkbox"
              className="toggle"
              onChange={() => HandleCheckedItem(todo.id)}
              checked={todo.completed}
            />

            <label
              htmlFor={todo.id}
              className={todo.completed ? 'completed-item' : ''}
            >
              {todo.title}
            </label>

            <button
              type="button"
              className="destroy"
              onClick={() => destroyItem(todo.id)}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  HandleCheckedItem: PropTypes.func.isRequired,
  destroyItem: PropTypes.func.isRequired,
};
