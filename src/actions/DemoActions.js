import alt from '../alt'
import { get } from '../core/httpClient'

class DemoActions {
  constructor () {
    this.generateActions(
      'update'
    )
  }

  fetch () {
    return (dispatch) => {
      dispatch()

      get('url')
        .then(data => this.update(data))
    }
  }
}

export default alt.createActions(DemoActions)
