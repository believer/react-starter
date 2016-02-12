import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Input.css'

class Input extends Component {
  renderLabel () {
    if (this.props.label) {
      return (
        <label htmlFor={this.props.name} styleName="label">
          {this.props.label}
        </label>
      )
    }

    return null
  }

  render () {
    return (
      <div>
        {this.renderLabel()}
        <input
          {...this.props}
          id={this.props.name}
          styleName="input"
          type={this.props.type || 'text'}
          />
      </div>
    )
  }
}

Input.propTypes = {
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
}

export default CSSModules(Input, styles)
