import alt from '../alt'
import DemoActions from '../actions/DemoActions'

class DemoStore {
  constructor() {
    this.bindListeners({
      fetch: DemoActions.fetch,
      update: DemoActions.update
    })

    this.data = []
  }

  fetch () {
    this.data = []
  }

  update (data) {
    this.data = data
  }
}

export default alt.createStore(DemoStore, 'DemoStore')
