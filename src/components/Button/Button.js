import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Button.css'

class Button extends Component {
  render () {
    return (
      <button
        onClick={this.props.onClick}
        styleName="button"
        type={this.props.type}>
        {this.props.text}
      </button>
    )
  }
}

Button.defaultProps = {
  type: 'submit'
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string
}

export default CSSModules(Button, styles)
