const configuration = require("./knexfile");

const knex = require("knex")(configuration);

module.exports = knex;
