const knex = require("../index");
const userLogins = require("./user-logins");
class UserService {
  constructor() {
    this.tableName = "users";
  }

  async findAllActive() {
    return knex(this.tableName)
      .join(
        userLogins.tableName,
        `${this.tableName}.id`,
        "=",
        `${userLogins.tableName}.user_id`
      )
      .where({
        is_active: true,
      })
      .select([
        `${userLogins.tableName}.*`,
        `${this.tableName}.username`,
        `${this.tableName}.register_at`,
        `${this.tableName}.updated_at`,
      ])
      .count(`${userLogins.tableName}.user_id`, { as: "loginsCount" })
      .groupBy(`${userLogins.tableName}.user_id`);
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

  async login(username) {
    return knex(this.tableName)
      .where("username", "=", username)
      .update("is_active", true);
  }

  async logout(username) {
    return knex(this.tableName)
      .where("username", "=", username)
      .update("is_active", false);
  }
}

module.exports = new UserService();
