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
        `${this.tableName}.username`,
        `${this.tableName}.id`,
        `${userLogins.tableName}.login_at`,
        `${userLogins.tableName}.last_login_at`,
        `${this.tableName}.updated_at`,
        `${userLogins.tableName}.ip_v4_address`,
      ])
      .groupBy(`${userLogins.tableName}.user_id`);
  }

  async findUserDetails(username) {
    return knex(this.tableName)
      .join(
        userLogins.tableName,
        `${this.tableName}.id`,
        "=",
        `${userLogins.tableName}.user_id`
      )
      .where({
        username,
      })
      .select([
        `${userLogins.tableName}.user_agent`,
        `${this.tableName}.register_at`,
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

  async delete(username) {
    return knex(this.tableName).where("username", "=", username).delete();
  }
}

module.exports = new UserService();
