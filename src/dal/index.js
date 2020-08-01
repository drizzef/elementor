const configuration = require("./knexfile");
const appConfig = require("../config");

const env = appConfig.env === "test" ? "testing" : "default";

const knex = require("knex")(configuration[env]);

module.exports = knex;
