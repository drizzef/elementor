const { UserService } = require("../dal/services");
const { errorResponse } = require("../utils");
class UserController {
  async getAll(req, res) {
    try {
      const result = await UserService.findAllActive();
      res.json({ data: result });
    } catch (error) {
      errorResponse(res, error);
    }
  }

  async getOne(req, res) {
    try {
      const { username } = req.user;
      const [result] = await UserService.findUserDetails(username);
      res.json({ data: result });
    } catch (error) {
      errorResponse(res, error);
    }
  }
}

module.exports = new UserController();
