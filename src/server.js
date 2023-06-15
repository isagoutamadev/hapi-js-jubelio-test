const Hapi = require('@hapi/hapi');
const productRoutes = require('./routes/ProductRoute');
require('dotenv').config();

const server = Hapi.server({
    port: process.env.PORT,
    host: 'localhost',
});

const init = async () => {
    server.route(productRoutes);

    try {
        await server.start();
        console.log('Server running on %s', server.info.uri);
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

init();
