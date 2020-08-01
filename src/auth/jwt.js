const jwt = require('jsonwebtoken');

module.exports = {
  // TODO: add expiration
  sign(payload, secret) {
    return jwt.sign(payload, secret);
  },

  verify(token, secret) {
    return jwt.verify(token, secret);
  },
};
