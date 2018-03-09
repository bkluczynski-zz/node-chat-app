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
  console.log('New user connected');
});


server.listen(port, () => {
  console.log(`app is litening on port ${port}`);
});
