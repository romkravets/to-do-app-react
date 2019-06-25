import * as React from 'react';
import { generateId } from '../../service/id-generator';
import { FILTERS } from '../../utils/filters';

const filters = Object.keys(FILTERS).reduce((filtersMap, filterName) => {
  filtersMap.set(filterName, {
    title: filterName.toLowerCase(),
    value: filterName,
    id: generateId(),
  })
  return filtersMap;
}, new Map());

export class TaskListFooter extends React.Component {
  onChange(e) {
    this.props.onFilterChange(e.target.value);
  }

  render() {
    const filtersElements = [];

    for (const [key, filter] of filters) {
      const element = <label htmlFor={filter.id}>
        <input type="radio"
          id={filter.id}
          name="filter"
          checked={this.props.activeFilter === filter.value}
          onChange={(e) => this.onChange(e)}
          value={filter.value} />
        {filter.title}
      </label>;

      filtersElements.push(element);
    }

    return <div className="footer">
      <div className="footer__counter">
        {this.props.counter}
      </div>
      <div className="footer__filters">
        {filtersElements}
      </div>
      <div className="footer__control"></div>
    </div>
  }
}