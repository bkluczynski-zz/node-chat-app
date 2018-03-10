const expect = require('expect');
const { generateMessage } = require('../utils');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const message = generateMessage('bart', 'do your laundry');
    expect(message.from).toBe('bart');
    expect(message.text).toBe('do your laundry');
    expect(message.createdAt).toBeA('number');
  });
});
