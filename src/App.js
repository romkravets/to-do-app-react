import * as React from 'react';
import { Component } from 'react';
import {TaskList} from './components/task-list/TaskList';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <TaskList/>
      </div>
    );
  }
}

export default App;
