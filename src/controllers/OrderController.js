const Service = require('../services/OrderService');
const RoleMiddleware = require('../middlewares/RoleMiddleware');

async function getList(request, h) {
    try {
        const authUser = request.auth.credentials;
        
        const { page = 1, limit = 10 } = request.query;
        const result = await Service.getList({
            page: Number(page), 
            limit: Number(limit),
            user_id: authUser.role === 'customer' ? authUser.id : undefined
        });

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
        const authUser = request.auth.credentials;

        const result = await Service.getById(id, authUser.role === 'customer' ? authUser.id : undefined);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function confirm(request, h) {
    try {
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['admin']);

        const { id } = request.params;

        const result = await Service.confirm(id, authUser.id);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function otw(request, h) {
    try {
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['admin']);

        const { id } = request.params;

        const result = await Service.otw(id, authUser.id);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function success(request, h) {
    try {
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['customer']);

        const { id } = request.params;

        const result = await Service.success(id, authUser.id);

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
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['admin']);

        const { id } = request.params;
        await Service.deleteData(id, authUser.id);
        
        return h.response().code(204);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
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