const { jwt: JWT, hasher: Hasher } = require("../auth");
const { jwt } = require("../config");
const userService = require("../dal/services/user");
const { errorResponse } = require("../utils");
const appConfig = require("../config");

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      // hash password
      password = await Hasher.hash(password, appConfig.hash.salt);
      const result = await userService.create(username, password);
      res.json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  }

  login(req, res) {
    const { username, id } = req.user;
    const token = JWT.sign({ username, sub: id }, jwt.secret);
    res.json({ token });
  }

  auth(req, res) {
    const { username } = req.user;
    res.json({ username });
  }
}

module.exports = new AuthController();
