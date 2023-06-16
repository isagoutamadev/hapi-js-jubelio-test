require('dotenv').config();
const Hapi = require('@hapi/hapi');
const AuthService = require('./services/AuthService');

const authRoutes = require('./routes/AuthRoute');
const productRoutes = require('./routes/ProductRoute');
const cartRoutes = require('./routes/CartRoute');

const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
});

const validate = async function (decoded, request, h) {
    try {
        const credentials = await AuthService.getById(decoded.id);
        return { isValid: true, credentials };
    } catch (error) {
        console.error(error);
        return { isValid: false };
    }
};

const init = async () => {
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt', { 
        key: process.env.JWT_KEY, // Never Share your secret key
        validate: validate  // validate function defined above
    });
    server.auth.default('jwt');

    server.route(authRoutes);
    server.route(productRoutes);
    server.route(cartRoutes);

    try {
        await server.start();
        console.log('Server running on %s', server.info.uri);
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

init();
