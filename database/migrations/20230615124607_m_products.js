/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("m_products", function (table) {
        table.increments("id").primary().notNullable();
        table.string("sku").unique().notNullable();
        table.string("image").notNullable();
        table.string("name").notNullable();
        table.integer("stock").unsigned().notNullable();
        table.integer("price").unsigned().notNullable();
        table.text("description").nullable();
        table.timestamp("deleted_at").nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("m_products");
};
