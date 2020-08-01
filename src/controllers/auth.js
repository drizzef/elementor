const { jwt: JWT, hasher: Hasher } = require("../auth");
const { jwt } = require("../config");
const userService = require("../dal/services/user");
const userLoginsService = require("../dal/services/user-logins");
const { errorResponse } = require("../utils");
const appConfig = require("../config");
const utils = require("../utils");
const user = require("../dal/services/user");

class AuthController {
  async register(req, res) {
    try {
      const { username } = req.body;
      let { password } = req.body;
      // hash password
      password = await Hasher.hash(password, appConfig.hash.salt);
      const result = await userService.create(username, password);
      res.status(201).json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  }

  async login(req, res) {
    /**
     * Generate token
     */
    const { username, id } = req.user;
    const token = JWT.sign({ username, sub: id }, jwt.secret);

    /**
     * Create login record
     */
    const ipAddress = utils.getIPAddress(req);
    const userAgent = req.headers["user-agent"];
    await userLoginsService.create(id, {
      ip_v4_address: ipAddress,
      user_agent: userAgent,
    });

    /**
     * Update user login status
     */
    await user.login(username);

    res.json({ token });
  }

  async logout(req, res) {
    /**
     * Update user login status
     */
    const { username } = req.user;

    await user.logout(username);
    res.json({ data: { acknowledged: true } });
  }

  auth(req, res) {
    const { username } = req.user;
    res.json({ username });
  }
}

module.exports = new AuthController();
