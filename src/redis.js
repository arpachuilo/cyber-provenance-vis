import io from 'socket.io-client'

class Redis {
  constructor () {
    this.socket = io.connect('http://localhost')
    this.add = this.add.bind(this)

    this.id = 'a'

    this.socket.emit('id', this.id)
  }

  add (k, v) {
    this.socket.emit('add', k, v)
    return this
  }
}

const redis = new Redis()
export default redis
