const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');
const { Socket } = require('dgram');


const publicPath = path.join(__dirname, '../public');
const app = express()
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'mike',
        text: `Hey! WHat's going on`,
        createAt: 12312
    });

    socket.on('createMessage', (message) => {
        console.log('CreateMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});