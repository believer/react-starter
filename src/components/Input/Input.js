import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Input.css';

@CSSModules(styles)
export default class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.oneOf([
      'color',
      'date',
      'datetime',
      'datetime-local',
      'email',
      'hidden',
      'month',
      'number',
      'password',
      'range',
      'search',
      'tel',
      'text',
      'time',
      'url',
      'week'
    ])
  };

  renderLabel () {
    if (this.props.label) {
      return (
        <label htmlFor={this.props.name} styleName="label">
          {this.props.label}
        </label>
      );
    }

    return null;
  }

  render () {
    return (
      <div>
        {this.renderLabel()}
        <input
          {...this.props}
          id={this.props.name}
          styleName={this.props.type}
          />
      </div>
    );
  }
}
