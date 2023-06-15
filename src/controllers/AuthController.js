const Service = require('../services/AuthService');

async function login(request, h) {
    const { username, password } = request.payload;

    try {
        const result = await Service.login(username, password);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

module.exports = {
    login,
};
