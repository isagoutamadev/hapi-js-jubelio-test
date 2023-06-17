const db = require('../utils/DB');

async function count(query) {
    const { rows } = await db.raw(`SELECT COUNT(x.id) FROM (${query}) as x`);

    return rows[0].count;
}

function getTotalPrice(products = []) {
    let totalPrice = 0;

    products.forEach(item => {
        totalPrice += item.price * item.qty;
    });

    return totalPrice;
}

async function getDatas({ page, limit, user_id }) {
    const offset = (page - 1) * limit;
    let query = `
    SELECT 
        "order".id, 
        "order".sku, 
        "order".status, 
        "order".created_at, 
        "order".updated_at,
        JSON_BUILD_OBJECT(
            'id', customer.id,
            'username', customer.username
        ) as customer,
        (
            SELECT JSON_AGG(prdc) FROM (
                SELECT 
                    mop.qty, 
                    mop.price,
                    JSON_BUILD_OBJECT(
                        'id', p.id,
                        'sku', p.sku,
                        'image', p.image,
                        'name', p.name
                    ) as product
                FROM m_order_products as mop
                INNER JOIN m_products as p ON (p.id = mop.product_id)
                WHERE mop.order_id = "order".id
            ) as prdc
        ) as products
    FROM m_orders as "order"
    INNER JOIN m_users as customer ON (customer.id = "order".created_by AND customer.deleted_at IS NULL)
    WHERE "order".deleted_at IS NULL`;

    const binding = { limit, offset };

    if (user_id) {
        query += ' AND "order".created_by = ' + user_id;
    }

    const total = await count(query);

    query += " LIMIT :limit OFFSET :offset";
    const { rows } = await db.raw(query, binding);

    return {
        page: page,
        limit: limit,
        total_data: Number(total),
        total_page: Math.ceil(total / limit),
        datas: rows.map(item => {
            return {
                total_price: getTotalPrice(item.products),
                ...item,
            }
        })
    };
}

async function getById(id, user_id) {
    let query = `
    SELECT 
        "order".id, 
        "order".sku, 
        "order".status, 
        "order".created_at, 
        "order".updated_at,
        JSON_BUILD_OBJECT(
            'id', customer.id,
            'username', customer.username
        ) as customer,
        (
            SELECT JSON_AGG(prdc) FROM (
                SELECT 
                    mop.qty, 
                    mop.price,
                    JSON_BUILD_OBJECT(
                        'id', p.id,
                        'sku', p.sku,
                        'image', p.image,
                        'name', p.name
                    ) as product
                FROM m_order_products as mop
                INNER JOIN m_products as p ON (p.id = mop.product_id)
                WHERE mop.order_id = "order".id
            ) as prdc
        ) as products
    FROM m_orders as "order"
    INNER JOIN m_users as customer ON (customer.id = "order".created_by AND customer.deleted_at IS NULL)
    WHERE "order".deleted_at IS NULL AND "order".id = :id`;

    if (user_id) {
        query += ` AND customer.id = '${user_id}'`
    }

    const { rows } = await db.raw(query, { id });
    if (rows[0]) {
        return {
            total_price: getTotalPrice(rows[0].products),
            ...rows[0],
        };
    }
}

/** 
 * @param user_id 
 * @param {{id, qty, price}[]} orders
 */

async function updateStatus({ id, status, user_id, admin_id }) {
    let query = `
    UPDATE m_orders
    SET status = :status, updated_at = now(), updated_by = :updated_by
    WHERE id = :id
    `;

    const binding = { id, status };

    if (user_id) {
        query += " AND created_by = :user_id";
        binding.user_id = user_id;
    }

    binding.updated_by = admin_id || user_id;

    query += " RETURNING *";

    const { rows } = await db.raw(query, binding);
    return rows[0];
}

async function deleteData(id, user_id) {
    const query = `
    UPDATE m_orders
    SET deleted_at = now(), deleted_by = :user_id
    WHERE id = :id
    RETURNING *
    `;
    const { rows } = await db.raw(query, { id, user_id });
    return true;
}

module.exports = {
    getDatas,
    getById,
    updateStatus,
    deleteData,
};
