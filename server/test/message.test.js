const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('../utils');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const message = generateMessage('bart', 'do your laundry');
    expect(message.from).toBe('bart');
    expect(message.text).toBe('do your laundry');
    expect(message.createdAt).toBeA('number');
  });
});
describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    const message = generateLocationMessage('bart', { longitude: 1, latitude: 10 });
    console.log('message is', message);
    expect(message.from).toBe('bart');
    expect(message.url).toBe('https://www.google.com/maps?q=10,1');
    expect(message.createdAt).toBeA('number');
  });
});
