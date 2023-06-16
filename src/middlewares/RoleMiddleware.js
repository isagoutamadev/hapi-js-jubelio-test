const RoleMiddleware = (userAuth, allowedRoles = []) => {
    if (allowedRoles.includes(userAuth.role)) {
        return;
    }

    throw {
        statusCode: 403,
        message: 'Forbidden'
    };
}

module.exports = RoleMiddleware;