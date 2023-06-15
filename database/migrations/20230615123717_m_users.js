/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("m_users", function (table) {
        table.increments("id").primary().notNullable();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.enu("role", ["admin", "customer"]).notNullable();
        table.timestamp("deleted_at").nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("m_users");
};
