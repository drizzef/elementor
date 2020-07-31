const appConfig = require("./config");

function errorResponse(res, error, status = 500) {
  if (appConfig.env !== "development") {
    error = { error: `There was a problem in the server.` };
  }
  res.status(status).json(error);
}

module.exports = {
  errorResponse,
};
