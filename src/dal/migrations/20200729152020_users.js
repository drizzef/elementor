exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id");
      table.string("username", 20).notNullable();
      table.string("passwd", 255).notNullable();
      table.boolean("is_active", false).notNullable();
      table.timestamp("register_at").defaultTo(knex.fn.now());
      table.timestamps(true, true);
      table.unique("username");
      table.index("is_active");
    })
    .createTable("users_logins", function (table) {
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
      table.string("ip_v4_address", 15);
      table.string("user_agent", 255).notNullable();
      table.timestamp("login_at").defaultTo(knex.fn.now());
      table.timestamp("last_login_at");
      table.index("user_id");
      table.index("login_at");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_logins").dropTable("users");
};
