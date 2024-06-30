const crypto = require('crypto');

function generateRandomKey(length) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = {
  generateRandomKey,
}