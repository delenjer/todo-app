import React from 'react';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    newTodoValue: '',
    generalCompleted: false,
    filterName: 'all',
  };

  componentDidMount() {
    const savedTodos = localStorage.getItem('todos');
    const savedFilter = localStorage.getItem('name');

    const todos = savedTodos ? JSON.parse(savedTodos) : this.state.todos;
    const filterName = savedFilter || this.state.filterName;

    if (todos) {
      this.setState({
        todos,
        filterName,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    if (prevState.filterName !== this.state.filterName) {
      localStorage.setItem('filter', this.state.filterName);
    }
  }

  addTodoInputValue = ({ target }) => {
    const { value } = target;

    this.setState(({
      newTodoValue: value,
    }));
  };

  handleAddNewTodo = (e) => {
    e.preventDefault();

    this.setState(({ todos, newTodoValue }) => {
      const newTodo = {
        id: +new Date(),
        title: newTodoValue,
        completed: false,
      };

      if (newTodoValue === '' || !newTodoValue.trim()) {
        return null;
      }

      return {
        todos: [...todos, newTodo],
        newTodoValue: '',
      };
    });
  };

  HandleCheckedItem = (itemId) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => (
        todo.id === itemId ? ({
          ...todo,
          completed: !todo.completed,
        }) : todo
      )),
    }));
  };

  checkedAllItem = () => {
    this.setState(prevState => ({
      generalCompleted: !prevState.generalCompleted,
      todos: [...prevState.todos].map(todo => ({
        ...todo,
        completed: !prevState.generalCompleted,
      })),
    }));
  };

  destroyItem = (itemId) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== itemId),
    }));
  };

  clearCompletedItem = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.completed),
      generalCompleted: false,
    }));
  };

  filtered = (name) => {
    this.setState({
      filterName: name,
    });
  };

  filteredCompleted = () => {
    const { filterName, todos } = this.state;

    switch (filterName) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }

  render() {
    const { newTodoValue, filterName, todos } = this.state;

    return (
      <section className="todoapp">
        <Header
          newTodoValue={newTodoValue}
          handleAddNewTodo={this.handleAddNewTodo}
          addTodoInputValue={this.addTodoInputValue}
        />

        <section className="main">
          {
            todos.length > 0 && (
              <>
                <input
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                  onChange={this.checkedAllItem}
                />

                <label htmlFor="toggle-all">Mark all as complete</label>
              </>
            )
          }

          <TodoList
            todos={this.filteredCompleted()}
            HandleCheckedItem={this.HandleCheckedItem}
            destroyItem={this.destroyItem}
          />
        </section>

        <Footer
          todos={todos}
          filterName={filterName}
          clearCompletedItem={this.clearCompletedItem}
          filtered={this.filtered}
        />
      </section>
    );
  }
}

export default App;
