const faker = require("faker");

module.exports = {
  username: faker.internet.userName(),
  password: faker.internet.password(10),
};
