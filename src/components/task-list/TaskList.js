import * as React from 'react';

import { HTTPService } from '../../service/http-service';
import { TaskListHeader } from './TaskListHeader';
import { List } from './List';
import { ListItem } from './ListItem';
import { TaskListFooter } from './TaskListFooter';
import { FILTERS } from '../../utils/filters';

import './TaskList.scss';

const URL = 'https://evening-dawn-11092.herokuapp.com/list';
const LS_FILTER_KEY = 'FILTER';
export class TaskList extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.httpService = new HTTPService();
    const savedFilter = localStorage.getItem(LS_FILTER_KEY)
    this.state = {
      tasks: new Map(),
      filter: savedFilter || FILTERS.ALL,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    console.log('Component wil unmount');
  }

  fetchData() {
    this.httpService.get(URL, (tasks) => {
      this.setState((oldState) => {
        const newState = Object.assign({}, oldState);
        newState.tasks = tasks.reduce((tasksMap, task) => {
          tasksMap.set(task.id, task);
          return tasksMap;
        }, new Map());
        return newState;
      });
    });
  }

  onSubmit(newTask) {
    this.httpService.post(URL, newTask, (task) => {
      this.setState((oldState) => {
        const newState = Object.assign({}, oldState);
        newState.tasks.set(task.id, task);
        return newState;
      });
    });
  }

  deleteItem(id) {
    this.httpService.delete(`${URL}/${id}`, (resp) => {
      this.setState((oldState) => {
        const newState = Object.assign({}, oldState);
        newState.tasks.delete(id);
        return newState;
      });
    })
  }

  updateItem(updatedTask) {
    this.httpService.put(`${URL}/${updatedTask.id}`, updatedTask, (task) => {
      this.setState(oldState => {
        const newState = Object.assign({}, oldState);
        newState.tasks.set(task.id, task)
        return newState;
      });
    });
  }

  setFilter(filter) {
    localStorage.setItem(LS_FILTER_KEY, filter);
    this.setState((oldState) => Object.assign({}, oldState, { filter }))
  }

  render() {
    const tasks = Array.from(this.state.tasks.values()).filter((item) => {
      switch (this.state.filter) {
        case FILTERS.ACTIVE:
          return !item.completed;
        case FILTERS.COMPLETED:
          return item.completed;
        default:
          return item;
      }
    });
    const listItems = tasks.map((task, i) => {
      return <ListItem
        title={task.title}
        id={task.id}
        key={i}
        completed={task.completed}
        onChange={this.updateItem}
        onDeleteItem={this.deleteItem}
      />
    });
    const leftItemsCounter = tasks.filter(task => !task.completed).length;

    return <div className="task-list">
      <TaskListHeader onSubmit={this.onSubmit} />
      <List>{listItems}</List>
      <TaskListFooter counter={leftItemsCounter} onFilterChange={this.setFilter} activeFilter={this.state.filter}/>
    </div>
  }
}