const { user } = require('pg/lib/defaults');
const Model = require('../models/OrderModel');

async function getList({page, limit, user_id}) {
    try {
        const result = await Model.getDatas({page, limit, user_id});

        return result;
    } catch (error) {
        throw error;
    }
}

async function getById(id, user_id) {
    try {
        const data = await Model.getById(id, user_id);
        if (data) {
            return data;
        }

        throw { statusCode: 404, message: "Order not found"};
    } catch (error) {
        throw error;
    }
}

async function confirm(id, admin_id) {
    try {
        const order = await getById(id);

        if (order.status !== 'waiting') {
            throw {
                statusCode: 433,
                message: "Invalid Order"
            };    
        }

        const result = await Model.updateStatus({id, admin_id, status: 'confirmed'});

        if (result) {
            return result;
        }

        throw { statusCode: 404, message: "Order not found"};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function otw(id, admin_id) {
    try {
        const order = await getById(id);

        if (order.status !== 'confirmed') {
            throw {
                statusCode: 433,
                message: "Invalid Order"
            };    
        }

        const result = await Model.updateStatus({id, admin_id, status: 'otw'});

        if (result) {
            return result;
        }

        throw { statusCode: 404, message: "Order not found"};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function success(id, user_id) {
    try {
        const order = await getById(id, user_id);

        if (order.status !== 'otw') {
            throw {
                statusCode: 433,
                message: "Invalid Order"
            };    
        }

        const result = await Model.updateStatus({id, user_id, status: 'success'});

        if (result) {
            return result;
        }

        throw { statusCode: 404, message: "Order not found"};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteData(id, user_id) {
    try {
        const deleted = await Model.deleteData(id, user_id);
        if (deleted) {
            return deleted;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getList,
    getById,
    confirm,
    otw,
    success,
    deleteData,
};
