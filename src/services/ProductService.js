const Model = require('../models/ProductModel');

async function getList({page, limit}) {
    try {
        const result = await Model.getDatas({page, limit});

        return result;
    } catch (error) {
        throw error;
    }
}

async function getById(id) {
    try {
        const data = await Model.getById(id);
        if (data) {
            return data;
        }

        throw { statusCode: 404, message: "Product not found"};
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

async function update(id, data) {
    try {
        const result = await Model.update(id, data);

        if (result) {
            return result;
        }

        throw { statusCode: 404, message: "Product not found"};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteData(id) {
    try {
        const deleted = await Model.deleteData(id);
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
    create,
    update,
    deleteData,
};
