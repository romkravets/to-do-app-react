import * as React from 'react';

import './ListItem.scss';

export class ListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      title: ''
    };
    this.updateText = this.updateText.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    const title = this.props.title;
    this.setState((state) => Object.assign({}, state, {title}))
  }

  deleteItem() {
    this.props.onDeleteItem(this.props.id);
  }

  onChange() {
    const task = Object.assign({}, this.props);
    task.completed = !task.completed;
    this.props.onChange(task);
  }

  updateText(e) {
    const title = e.target.value;
    this.setState((state) => {
      return Object.assign({}, state, {title});
    });
  }

  onBlur() {
    const task = Object.assign({}, this.props, this.state);
    this.props.onChange(task);
    this.toggleEdit();
  }

  toggleEdit() {
    const isEdit = !this.state.isEdit;
    this.setState(state => Object.assign({}, state, {isEdit}));
  }

  render() {
    let classNames = 'list-item';

    if (this.state.isEdit) {
      classNames += ' list-item_edit';
    }

    return <li className={classNames} id={this.props.id} onDoubleClick={this.toggleEdit}>
      <span className="list-item__checkbox">
        <input className="list-item__native-input"  
            type="checkbox" 
            id={'input'+this.props.id}
            onChange={this.onChange.bind(this)}
            checked={this.props.completed}/>
        <label className="list-item__label" htmlFor={'input'+this.props.id}></label>
      </span>
      <span className="list-item__title">
        {this.props.title}
      </span>
      <input className="list-item__input" 
        value={this.state.title} 
        onBlur={this.onBlur}
        onChange={this.updateText}/>
      <button className="list-item__del" onClick={this.deleteItem.bind(this)}>X</button>
    </li>;
  }
}
