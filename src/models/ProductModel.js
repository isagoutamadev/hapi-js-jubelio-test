const db = require('../utils/DB');

async function count(query) {
    const { rows } = await db.raw(`SELECT COUNT(x.id) FROM (${query}) as x`);

    return rows[0].count;
}

async function getDatas({ page, limit }) {
    const offset = (page - 1) * limit;
    let query = "SELECT id, name, price, image, stock FROM m_products WHERE deleted_at IS NULL";

    const total = await count(query);

    query += " LIMIT :limit OFFSET :offset";
    const { rows } = await db.raw(query, { limit, offset });

    return {
        page: page,
        limit: limit,
        total_data: Number(total),
        total_page: Math.ceil(total / limit),
        datas: rows
    };
}

async function getById(id) {
    const query = `
    SELECT name, sku, image, price, stock, description FROM m_products
    WHERE id = :id AND deleted_at IS NULL
    `;
    const { rows } = await db.raw(query, { id });
    return rows[0];
}

async function create(data) {
    const { name, sku, image, price, description } = data;
    const query = `
    INSERT INTO products (name, sku, image, price, description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const { rows } = await db.raw(query, [name, sku, image, price, description || null]);
    return rows[0];
}

async function update(id, data) {
    const { name, sku, image, price, description } = data;
    const query = `
    UPDATE m_products
    SET name = :name, sku = :sku, image = :image, price = :price, description = :description
    WHERE id = :id
    RETURNING *
    `;
    const { rows } = await db.raw(query, { name, sku, image, price, description: description || null, id});
    return rows[0];
}

async function deleteData(id) {
    const query = `
    UPDATE m_products
    SET sku = concat(sku, '-deleted-', now()), deleted_at = now()
    WHERE id = :id
    RETURNING *
    `;
    const { rows } = await db.raw(query, {id});
    return true;
}

module.exports = {
    getDatas,
    getById,
    create,
    update,
    deleteData,
};
