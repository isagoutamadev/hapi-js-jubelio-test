/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("m_order_products", function (table) {
        table.uuid("order_id").notNullable().references("m_orders.id");
        table.integer("product_id").unsigned().notNullable().references("m_products.id");
        table.integer("qty").unsigned().notNullable();
        table.integer("price").unsigned().notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("m_orders");
};
