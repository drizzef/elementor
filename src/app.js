const express = require("express");
const logger = require("morgan");
require("./config");

// load auth modules
const { passport } = require("./auth");

const routes = require("./routes");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

module.exports = app;
