const db = require('../utils/DB');

async function count(query) {
    const { rows } = await db.raw(`SELECT COUNT(x.qty) FROM (${query}) as x`);

    return rows[0].count;
}

async function getDatas({ page, limit, user_id = 0 }) {
    const offset = (page - 1) * limit;

    let query = `
    SELECT 
        cart.qty,
        JSON_BUILD_OBJECT(
            'id', product.id,
            'name', product.name,
            'stock', product.stock,
            'price', product.price
        ) as product 
    FROM m_cart_user_products as cart
    INNER JOIN m_products as product ON (product.id = cart.product_id AND product.deleted_at IS NULL)
    WHERE cart.user_id = ${user_id}`;

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
    SELECT id, name FROM m_cart_user_products
    WHERE id = :id AND deleted_at IS NULL
    `;
    const { rows } = await db.raw(query, { id });
    return rows[0];
}

async function create(data) {
    const { product_id, user_id, qty } = data;

    const query = `
    INSERT INTO m_cart_user_products (code, user_id, product_id, qty, created_at)
    VALUES (:code, :user_id, :product_id, :qty, now())
    ON CONFLICT (code) DO
    UPDATE SET qty = m_cart_user_products.qty + :qty, updated_at = now()
    RETURNING *
    `;

    const binding = {
        code: `${user_id}-${product_id}`,
        user_id,
        product_id,
        qty
    };
    const { rows } = await db.raw(query, binding);
    return rows[0];
}

async function update({ user_id, product_id, qty }) {
    const query = `
    UPDATE m_cart_user_products
    SET qty = :qty, updated_at = now()
    WHERE code = :code
    RETURNING *
    `;

    const binding = {
        qty,
        code: `${user_id}-${product_id}`,
    };

    const { rows } = await db.raw(query, binding);
    return rows[0];
}

async function deleteData({ user_id, product_id }) {
    const query = `
    DELETE FROM m_cart_user_products
    WHERE code = :code
    `;
    const { rows } = await db.raw(query, { code: `${user_id}-${product_id}` });
    return true;
}

module.exports = {
    getDatas,
    getById,
    create,
    update,
    deleteData,
};
