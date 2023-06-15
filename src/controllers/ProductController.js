const Service = require('../services/ProductService');

async function getList(request, h) {
    const { page = 1, limit = 10 } = request.query;

    try {
        const result = await Service.getList({page: Number(page), limit: Number(limit)});

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function getById(request, h) {
    const { id } = request.params;
    console.log(request.params);

    try {
        const result = await Service.getById(id);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function create(request, h) {
    const data = request.payload;

    try {
        const result = await Service.create(data);

        return h.response(result).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function update(request, h) {
    const { id } = request.params;
    const payload = request.payload;

    try {
        const result = await Service.update(id, payload);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function deleteData(request, h) {
    const { id } = request.params;

    try {
        await Service.deleteData(id);
        
        return h.response().code(204);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.code || 500);
    }
}

module.exports = {
    getList,
    getById,
    create,
    update,
    deleteData,
};
