const crypto = require('crypto');

function base64(data) {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

function signature(private_key, data) {
  return crypto.createHash('sha1').update(private_key + data + private_key).digest('base64');
}

module.exports = { base64, signature };
