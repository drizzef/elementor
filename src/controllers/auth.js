const { jwt, hasher } = require('../auth');
const { jwt: jwtConfig } = require('../config');
const userService = require('../dal/services/user');
const userLoginsService = require('../dal/services/user-logins');
const { errorResponse } = require('../utils');
const appConfig = require('../config');
const utils = require('../utils');

module.exports = {
  async register(req, res) {
    try {
      const { username } = req.body;
      let { password } = req.body;
      // hash password
      password = await hasher.hash(password, appConfig.hash.salt);
      const result = await userService.create(username, password);
      res.status(201).json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  },

  async login(req, res) {
    /**
     * Generate token
     */
    const { username, id } = req.user;
    const token = jwt.sign({ username, sub: id }, jwtConfig.secret);

    /**
     * Create login record
     */
    const ipAddress = utils.getIPAddress(req);
    const userAgent = req.headers['user-agent'];
    await userLoginsService.create(id, {
      ip_v4_address: ipAddress,
      user_agent: userAgent,
    });

    /**
     * Update user login status
     */
    await userService.login(username);

    res.json({ token });
  },

  async logout(req, res) {
    /**
     * Update user login status
     */
    const { username } = req.user;

    await userService.logout(username);
    res.json({ data: { acknowledged: true } });
  },

  auth(req, res) {
    const { username } = req.user;
    res.json({ username });
  },
};
