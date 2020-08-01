const { UserService } = require('../dal/services');
const { errorResponse } = require('../utils');

module.exports = {
  async getAll(req, res) {
    try {
      const result = await UserService.findAllActive();
      res.json({ data: result });
    } catch (error) {
      errorResponse(res, error);
    }
  },

  async getOne(req, res) {
    try {
      const { username } = req.user;
      const [result] = await UserService.findUserDetails(username);
      res.json({ data: result });
    } catch (error) {
      errorResponse(res, error);
    }
  },
};
