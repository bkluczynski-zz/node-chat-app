const path = require('path');

const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');

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

  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the chat!',
    createdAt: new Date().getTime(),
  });
  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', (message) => {
    // io.emit sends data to all connections
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime(),
    });
  });
  console.log('new user has connected');
});


server.listen(port, () => {
  console.log(`app is litening on port ${port}`);
});
