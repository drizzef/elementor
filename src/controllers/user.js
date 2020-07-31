const { UserService } = require("../dal/services");
const { errorResponse } = require("../utils");
class UserController {
  async getAll(req, res) {
    try {
      const result = await UserService.findAllActive();
      res.json(result);
    } catch (error) {
      errorResponse(res, error);
    }
  }
  getOne(req, res, next) {}
}

module.exports = new UserController();
