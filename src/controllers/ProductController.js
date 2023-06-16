const Service = require('../services/ProductService');
const RoleMiddleware = require('../middlewares/RoleMiddleware');

async function getList(request, h) {
    try {
        const { page = 1, limit = 10 } = request.query;
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
    try {
        const { id } = request.params;
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
    try {
        RoleMiddleware(request.auth.credentials, ['admin']);

        const data = request.payload;
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
    try {
        RoleMiddleware(request.auth.credentials, ['admin']);

        const { id } = request.params;
        const payload = request.payload;
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
    try {
        RoleMiddleware(request.auth.credentials, ['admin']);

        const { id } = request.params;
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
