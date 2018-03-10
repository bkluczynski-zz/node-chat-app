
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage } = require('./utils');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());

// handling client resources
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.emit('newMessage', generateMessage('admin', 'welcome to the chat'));
  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user joined'));

  socket.on('createMessage', (message, callback) => {
    // io.emit sends data to all connections
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server!');
  });
  console.log('new user has connected');
});


server.listen(port, () => {
  console.log(`app is litening on port ${port}`);
});
