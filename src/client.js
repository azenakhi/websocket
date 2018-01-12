import socketio from 'socket.io-client'

var socket = socketio()

var form = document.querySelector('form')
var ul = document.querySelector('ul')
var input = document.querySelector('input')

socket.on('chat', msg => {
    var li = document.createElement('li')
    li.innerHTML = msg
    ul.appendChild(li)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    socket.emit('chat', input.value)
    socket.emit('login', input.value)
})

socket.on('logged', () => {
    alert('logged')
})

