/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("m_orders", function (table) {
        table.uuid("id").primary().notNullable();
        table.string("sku").unique().notNullable()
            .comment("CONCAT('INV/', user_id, '/', :year, :month, :date, '/', :hour,':', :minute)");
        table.enu("status", ["waiting", "confirmed", "otw", "success"]).notNullable();
        table.integer("created_by").unsigned().notNullable().references("m_users.id").onDelete("cascade");
        table.integer("updated_by").unsigned().nullable().references("m_users.id").onDelete("cascade");
        table.integer("deleted_by").unsigned().nullable().references("m_users.id").onDelete("cascade");
        table.timestamp("created_at").notNullable();
        table.timestamp("updated_at").nullable();
        table.timestamp("deleted_at").nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("m_orders");
};
