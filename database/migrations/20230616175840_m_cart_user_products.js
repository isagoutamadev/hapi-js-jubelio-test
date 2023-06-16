/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("m_cart_user_products", function (table) {
        table.string("code").unsigned().unique().notNullable().comment("CONCAT(user_id, '-', product_id)");
        table.integer("user_id").unsigned().notNullable().references("m_users.id").onDelete("cascade");
        table.integer("product_id").unsigned().notNullable().references("m_products.id").onDelete("cascade");
        table.integer("qty").unsigned().notNullable();
        table.timestamp("created_at").nullable();
        table.timestamp("updated_at").nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("m_cart_user_products");
};
