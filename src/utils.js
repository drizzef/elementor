const appConfig = require("./config");

function errorResponse(res, error, status = 500) {
  if (appConfig.env !== "development") {
    error = { error: `There was a problem in the server.` };
  }
  res.status(status).json(error);
}

function getIPAddress(req) {
  if (appConfig.express.ipAddressHeader) {
    return req.headers[appConfig.express.ipAddressHeader];
  }
  return req.connection.remoteAddress;
}

module.exports = {
  errorResponse,
  getIPAddress,
};
