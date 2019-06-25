import * as React from 'react';

export class TaskListHeader extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.state = {
      newTaskTitle: ''
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e);
    const title = this.state.newTaskTitle;
    this.setState((oldState) => {
      const newState = Object.assign({}, oldState);
      newState.newTaskTitle = '';
      return newState;
    });
    this.props.onSubmit({title});
  }

  valueChange(e) {
    const value = e.target.value;
    this.setState((oldState) => {
      const newState = Object.assign({}, oldState);
      newState.newTaskTitle = value;
      return newState;
    });
  }

  render() {
    return <form className="task-list__head" onSubmit={this.onSubmit}>
      <input
        type="text"
        className="task-list__input"
        placeholder="To do"
        onChange={this.valueChange}
        value={this.state.newTaskTitle} />
      <button className="task-list__btn">Add</button>
    </form>
  }
}