import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import Button from '../Button/Button'

import DemoActions from '../../actions/DemoActions'
import DemoStore from '../../stores/DemoStore'
import connectToStores from 'alt-utils/lib/connectToStores'

class App extends Component {
  componentDidMount() {
    DemoActions.fetch()
  }

  static getStores () {
    return [DemoStore]
  }

  static getPropsFromStores () {
    return DemoStore.getState()
  }

  _renderStore () {
    const {
      data
    } = this.props

    if (!data.length) {
      return <div styleName="data">Laddar data...</div>
    }

    return (
      <ul styleName="data">
        {data.map((movie, i) =>
          <li key={i}>{movie.title}</li>
        )}
      </ul>
    )
  }

  render () {
    return (
      <div className="container">
        <Button
          onClick={DemoActions.fetch}
          text="Refresha" />
        {this._renderStore()}
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default connectToStores(CSSModules(App, styles))
