const db = require('../utils/DB');
const { v4: uuidv4 } = require('uuid');

async function count(query) {
    const { rows } = await db.raw(`SELECT COUNT(x.qty) FROM (${query}) as x`);

    return rows[0].count;
}

function getTotalPrice(orders = []) {
    let totalPrice = 0;

    orders.forEach(item => {
        totalPrice += item.product.price * item.qty;
    });

    return totalPrice;
}
async function getDatas({ page, limit, user_id = 0 }) {
    let offset = undefined;
    if (page && limit) {
        offset = (page - 1) * limit;
    }

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

    const binding = {};

    console.log(binding);
    const { rows } = await db.raw(query, binding);

    return {
        total_price: getTotalPrice(rows),
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


/**
 * 
 * @param {string} user_id 
 * @param {{product_id, qty, price}[]} orders 
 * @returns 
 */
async function checkout(user_id, orders) {
    let order = null;
    await db.transaction(async (trx) => {
        /**
         * INSERT ORDER
         */
        const current = new Date();
        const bindingOrder = {
            sku: `INV/${user_id}/${current.getFullYear()}${current.getUTCMonth()}${current.getUTCDate()}/${current.getUTCHours()}:${current.getUTCMinutes()}`,
            created_by: user_id,
        };

        const orderQuery = await trx.raw(`
        INSERT INTO m_orders (id, sku, status, created_by, created_at)
        VALUES ('${uuidv4()}', :sku, 'waiting', :created_by, now())
        RETURNING id, sku, status
        `, bindingOrder);
        order = orderQuery.rows[0];

        /**
         * INSERT ORDER PRODUCTS
         */
        const orderProductValues = orders.map(item => {
            return `('${order.id}', ${item.product_id}, ${item.qty}, ${item.price})`;
        });
        const orderProductQuery = await trx.raw(`
        INSERT INTO m_order_products (order_id, product_id, qty, price)
        VALUES ${orderProductValues.join(',')}
        RETURNING *
        `);
        console.log(orderProductQuery.rows);

        /**
         * DEDUCT/UPDATE STOCK PRODUCTS
         */
        await trx.raw(`
        UPDATE m_products as product SET stock = product.stock - item.qty
        FROM (VALUES 
            ${orderProductValues.join(',\n')}
        ) AS item(order_id, product_id, qty, price)
        WHERE item.product_id = product.id
        `);

        /**
         * DELETE USER CART PRODUCTS
         */
        await trx.raw("DELETE FROM m_cart_user_products WHERE user_id = :user_id", { user_id });
    });
    
    return order;
}

module.exports = {
    getDatas,
    getById,
    create,
    update,
    deleteData,
    checkout
};
