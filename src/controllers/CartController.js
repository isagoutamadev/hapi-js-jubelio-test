const RoleMiddleware = require('../middlewares/RoleMiddleware');
const Service = require('../services/CartService');

async function getList(request, h) {
    try {
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['customer']);

        const { page = 1, limit = 10 } = request.query;
        const result = await Service.getList({ page: Number(page), limit: Number(limit), user_id: authUser.id });

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
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['customer']);

        const data = request.payload;
        data.user_id = authUser.id;

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
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['customer']);

        const { product_id } = request.params;
        const payload = request.payload;

        payload.user_id = authUser.id;
        payload.product_id = product_id;

        if (payload.qty == 0) {
            return deleteData(request, h);
        }

        const result = await Service.update(payload);

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
        RoleMiddleware(authUser, ['customer']);

        const { product_id }= request.params;
        await Service.deleteData({
            product_id,
            user_id: authUser.id
        });

        return h.response().code(204);
    } catch (error) {
        console.error(error);
        return h.response({
            error: error.message || 'Internal Server Error'
        }).code(error.statusCode || 500);
    }
}

async function checkout(request, h) {
    try {
        const authUser = request.auth.credentials;
        RoleMiddleware(authUser, ['customer']);

        const result = await Service.checkout(authUser.id);

        return h.response(result).code(201);
    } catch (error) {
        console.error(error);
        return h.response({
            error: error.message || 'Internal Server Error'
        }).code(error.statusCode || 500);
    }
}

module.exports = {
    getList,
    create,
    update,
    deleteData,
    checkout
};