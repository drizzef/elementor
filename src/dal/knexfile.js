// Update with your config settings.
const appConfig = require("../config");
const path = require("path");
const { db } = appConfig;

module.exports = {
  default: {
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
    pool: {
      min: 2, // TODO: export in the env variable
      max: 10, // TODO: export in the env variable
      afterCreate: function (conn, cb) {
        conn.query('SET sql_mode="NO_ENGINE_SUBSTITUTION";', function (err) {
          cb(err, conn);
        });
      },
    },
  },
  testing: {
    client: "sqlite3",
    connection: ":memory:",
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
  },
};
