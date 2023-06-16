const RoleMiddleware = (userAuth, allowedRoles = []) => {
    if (allowedRoles.length > 0 && !allowedRoles.includes(userAuth)) {
        throw {
            statusCode: 403,
            message: 'Forbidden'
        };
    }
}

module.exports = RoleMiddleware;