import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Button.css';

@CSSModules(styles)
export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'submit'
  };

  render () {
    return (
      <button
        styleName="button"
        type={this.props.type}>
        {this.props.text}
      </button>
    );
  }
}
