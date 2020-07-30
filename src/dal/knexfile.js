// Update with your config settings.
const appConfig = require("../config");
const { db } = appConfig;

module.exports = {
  client: "mysql2",
  connection: {
    host: db.host,
    port: db.port,
    password: db.password,
    user: db.username,
    database: db.dbName,
  },
  migrations: {
    tableName: "migrations",
  },
};
