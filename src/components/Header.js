import React from 'react';
import PropTypes from 'prop-types';

export const Header = (props) => {
  const { handleAddNewTodo, newTodoValue, addTodoInputValue } = props;

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleAddNewTodo}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodoValue}
          onChange={addTodoInputValue}
        />
      </form>
    </header>
  );
};

Header.propTypes = {
  handleAddNewTodo: PropTypes.func.isRequired,
  addTodoInputValue: PropTypes.func.isRequired,
  newTodoValue: PropTypes.string.isRequired,
};
