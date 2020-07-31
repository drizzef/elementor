const jwt = require("jsonwebtoken");

class JWT {
  // TODO: add expration
  sign(payload, secret) {
    return jwt.sign(payload, secret);
  }

  verify(token, secret) {
    return jwt.verify(token, secret);
  }
}

module.exports = new JWT();
