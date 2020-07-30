require("dotenv").config();
module.exports = {
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWD,
    dbName: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
};
