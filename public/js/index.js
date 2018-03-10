const socket = io();
socket.on('connect', () => {
  console.log('connected to the server');
});
socket.on('disconnect', () => {
  console.log('connection dropped');
});
socket.on('newMessage', (message) => {
  console.log('new message is', message);
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val(),
  }, (data) => {
    console.log('got it', data);
  });
});
