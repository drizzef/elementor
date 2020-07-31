const knex = require("../index");

class UserLoginsService {
  constructor() {
    this.tableName = "users_logins";
  }

  async create(userId, userInfo) {
    return knex(this.tableName).insert({
      user_id: userId,
      ...userInfo,
    });
  }
}

module.exports = new UserLoginsService();
