const bcrypt = require('bcrypt');

module.exports = {
  async hash(str, salt) {
    return bcrypt.hash(str, salt);
  },

  async compare(str, hashed) {
    return bcrypt.compare(str, hashed);
  },
};
