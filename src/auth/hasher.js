const bcrypt = require("bcrypt");

class Hasher {
  async hash(str, salt) {
    return bcrypt.hash(str, salt);
  }

  async compare(str, hashed) {
    return bcrypt.compare(str, hashed);
  }
}

module.exports = new Hasher();
