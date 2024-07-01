const crypto = require('crypto');

function generateRandomKey(length) {
  return crypto.randomBytes(length).toString('hex');
}

function getResResult(code, message = '', data = null) {
  return {
    code,
    message,
    data,
  }
}

module.exports = {
  generateRandomKey,
  getResResult,
}