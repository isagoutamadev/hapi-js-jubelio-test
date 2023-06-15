const Hapi = require('@hapi/hapi');
require('dotenv').config();

const authRoutes = require('./routes/AuthRoute');
const productRoutes = require('./routes/ProductRoute');

const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
});

const init = async () => {
    server.route(authRoutes);
    server.route(productRoutes);

    try {
        await server.start();
        console.log('Server running on %s', server.info.uri);
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

init();
