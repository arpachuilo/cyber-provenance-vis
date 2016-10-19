import io from 'socket.io-client'

import config from './config'

class Redis {
  constructor () {
    this.socket = io.connect('http://localhost:8080')
    this.add = this.add.bind(this)

    this.id = config.id

    this.socket.emit('id', this.id)
  }

  demographics (d) {
    this.socket.emit('demographics', d)
  }

  questionnaire (q) {
    this.socket.emit('questionnaire', q)
  }

  add (k, v) {
    this.socket.emit('add', k, v)
  }

  save () {
    this.socket.emit('save')
  }
}

const redis = new Redis()
export default redis
