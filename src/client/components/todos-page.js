import React from 'react';
import { Link } from 'react-router';

import { api, getApiPromise } from '../helpers/api';
import Navbar from './navbar';
import TodoForm from './todo-form';
import Todos from './todos';
import TodosRemaining from './todo-remaining';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: React.PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: props.params.filter,
    };
    
    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.onClickArchiveAll = this.onClickArchiveAll.bind(this);
    this.onClickCompleteAll = this.onClickCompleteAll.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
    this.setFilterBy(this.props.route.filter);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }


  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
    this.updateRemainingTodos();
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Click handler archive all button
   */
  onClickArchiveAll(){
    const todos = this.state.todos;
    todos.map((todo) => {
      if(todo.status === 'complete' && !todo.archive) {
        const newTodo = Object.assign({}, todo);
        todo.archive = true;
        api('PUT', todo, this.updateTodo);
      }
    });
  }

  /**
   * Click handler complete all
   */
  onClickCompleteAll(){
    const todos = this.state.todos;
    todos.map((todo) => {
      if(todo.status !== 'complete') {
        const newTodo = Object.assign({}, todo);
        todo.status = 'complete';
        api('PUT', todo, this.updateTodo);
      }
    });
  }

  /**
   * Returns amount of unfinished todos
   *
   */
  updateRemainingTodos(){
    const todos = this.state.todos;
    let remainingTodos = 0;
    todos.map(todo => {
      if(todo.status !== 'complete'){
        remainingTodos++;
      }
    });

    this.setState({remainingTodos});
  }

  /**
   * Update todo array state
   *
   * @param  {json} json - response from server
   */
  updateTodo = json => {
    const todos = this.state.todos;
    const index = todos.findIndex(todo => {
      return todo.id === json.id;
    });

    this.updateTodos(
      [
        ...todos.slice(0, index),
        json,
        ...todos.slice(index + 1),
      ]
    );  
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
    this.updateRemainingTodos();
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    const baseCls = 'todos-page';

    return (
      <div className={baseCls}>
        <Navbar filterBy={this.state.filterBy} 
                onClickFilter={this.setFilterBy} onClickArchiveAll={this.onClickArchiveAll} />
        
        <TodosRemaining remainingTodos={this.state.remainingTodos} onClickCompleteAll={this.onClickCompleteAll}/>
        <TodoForm onSubmit={this.addTodo} />
        
        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default TodosPage;
