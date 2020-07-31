const knex = require("../index");

class UserService {
  constructor() {
    this.tableName = "users";
  }

  async findOne(username, select = "*") {
    return knex(this.tableName)
      .where({
        username,
      })
      .select(select)
      .limit(1);
  }

  async create(username, password) {
    return knex(this.tableName).insert({
      username,
      passwd: password,
      is_active: true,
    });
  }

  async isExist(username) {
    const result = await this.findOne(username, "id");
    return result.length ? true : false;
  }
}

module.exports = new UserService();
