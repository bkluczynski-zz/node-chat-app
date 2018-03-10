const socket = io();
socket.on('connect', () => {
  console.log('connected to the server');
});
socket.on('disconnect', () => {
  console.log('connection dropped');
});
socket.on('newMessage', (message) => {
  console.log('new message is', message);
});
