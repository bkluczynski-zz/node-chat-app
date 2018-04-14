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
socket.on('newLocationMessage', (message) => {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val(),
  }, () => jQuery('[name=message]').val(''));
});

const geoPosition = jQuery('#send-location');

geoPosition.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not available');
  }

  geoPosition.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition((position) => {
    geoPosition.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  }, () => {
    geoPosition.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
