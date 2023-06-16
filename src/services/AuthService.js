const Model = require('../models/AuthModel');
const AuthHelper = require('../helpers/AuthHelper');

async function getById(id) {
    try {
        const data = await Model.getById(id);
        if (data) {
            return data;
        }

        throw { statusCode: 404, message: "User not found"};
    } catch (error) {
        throw error;
    }
}

async function login(username, password) {
    try {
        const data = await Model.getByUsername(username);
        if (!data) {
            throw { statusCode: 422, message: "username or password invalid"};
        }

        if (AuthHelper.compare(password, data.password)) {
            delete data.password;
            return {
                token: AuthHelper.jwtEncode({id: data.id}),
                user: data,
            }
        }

        throw { statusCode: 403, message: "username or password invalid"};

    } catch (error) {
        throw error;
    }
}

module.exports = {
    login,
    getById,
};
