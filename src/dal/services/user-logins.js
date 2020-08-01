const knex = require('../index');

class UserLoginsService {
  constructor() {
    this.tableName = 'users_logins';
  }

  async getLastLogin(userId) {
    return knex(this.tableName)
      .select('login_at')
      .where('user_id', '=', userId)
      .orderBy('login_at', 'desc')
      .limit(1);
  }

  async create(userId, userInfo) {
    const [lastLoginAt] = await this.getLastLogin(userId);
    return knex(this.tableName).insert({
      user_id: userId,
      last_login_at: lastLoginAt,
      ...userInfo,
    });
  }
}

module.exports = new UserLoginsService();
