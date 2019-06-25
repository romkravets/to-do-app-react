import * as React from 'react';

export class List extends React.Component {
  render() {
    return <div className="list">
      <ul className="task-list__content">
        {this.props.children}
      </ul>
    </div>
  }
}