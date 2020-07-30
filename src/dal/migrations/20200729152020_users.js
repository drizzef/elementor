exports.up = function (knex) {
  return knex.schema
    .createTable("users_logins", function (table) {
      table.string("username", 20).notNullable();
      table.string("ip_v4_address", 15);
      table.string("user_agent", 255).notNullable();
      table.timestamp("login_at").defaultTo(knex.fn.now());
      table.index("username");
    })
    .createTable("users", function (table) {
      table.increments("id");
      table
        .string("username", 20)
        .notNullable()
        .references("users_logins.username");
      table.string("passwd", 255).notNullable();
      table.boolean("is_active", false).notNullable();
      table.timestamp("register_at").defaultTo(knex.fn.now());
      table.timestamps(true, true);
      table.unique("username");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_logins").dropTable("users");
};
