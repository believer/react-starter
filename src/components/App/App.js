import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './App.css';
import Input from '../Input/Input';
import Button from '../Button/Button';

@CSSModules(styles)
export class App extends Component {
  render () {
    return (
      <div className="container">
        Hello world!

        <Input
          name="test"
          placeholder="Herro" />
        <Button text="Send it!" />
      </div>
    );
  }
}
