import express from 'express'
import socketio from 'socket.io'
import path from 'path'
import http from 'http'

const app = express()
app.use(express.static(path.join(__dirname, '.')))

console.log(path.join(__dirname, '.'))

const port = process.env.port || 3000

var server = http.createServer(app).listen(port, function(){})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

var sockets = socketio.listen(server)

var messages = {}

sockets.on('connection', socket => {
    console.log('connected user')
    socket.on('disconnect', () => {
        console.log('disconnected user')
    })
    for(let msg in messages) {
        socket.emit('chat', messages[msg]) 
    }
    socket.on('chat', msg => {
        let key = new Date().getTime()
        messages[key] = msg
        sockets.emit('chat', msg)
    })
    socket.on('login', msg => {
        if (msg == 'ok') {
            socket.emit('logged')
        }
    }) 
})
