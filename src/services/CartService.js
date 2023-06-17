const Model = require('../models/CartModel');

async function getList({ page, limit, user_id }) {
    try {
        const result = await Model.getDatas({ page, limit, user_id });

        return result;
    } catch (error) {
        throw error;
    }
}

async function create(data) {
    try {
        const result = await Model.create(data);

        return result;
    } catch (error) {
        throw error;
    }
}

async function update(data) {
    try {
        const result = await Model.update(data);

        if (result) {
            return result;
        }

        throw { statusCode: 404, message: "Cart not found" };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteData(data) {
    try {
        const deleted = await Model.deleteData(data);
        if (deleted) {
            return deleted;
        }
    } catch (error) {
        throw error;
    }
}

function findOrderQtyMoreThanStock(cartOrders = []) {
    return cartOrders.find(item => item.qty > item.product.stock);
}

async function checkout(user_id) {
    try {
        const { datas: cartOrders } = await getList({ user_id });

        const orderItemInvalid = findOrderQtyMoreThanStock(cartOrders);
        if (orderItemInvalid) {
            throw { statusCode: 433, message: `Product stock with name ${orderItemInvalid.product.name} is less than qty that ordered` };
        }

        const orders = cartOrders.map(item => {
            return {
                product_id: item.product.id,
                qty: item.qty,
                price: item.product.price
            };
        });

        const result = await Model.checkout(user_id, orders);

        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getList,
    create,
    update,
    deleteData,
    checkout
};
