var app = require('http').createServer()
var io = require('socket.io')(app)
var redis = require('redis')
var client = redis.createClient()

app.listen(80)

// Store id and data for session
var id = ''
var data = {
  officeClicked: [],
  sliderMoved: [],
  histogramBrushed: [],
  headerClicked: [],
  pageChange: [],
  mousemove: [],
  id: id
}

io.on('connection', function (socket) {
  socket.on('id', function (value) {
    id = value
    data.id = id
  })

  socket.on('add', function (key, value) {
    data[key].push(value)
    client.set(id, JSON.stringify(data))
  })

  socket.on('save', function () {
    client.set(id, JSON.stringify(data))
  })
})
