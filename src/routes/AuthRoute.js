const Controller = require('../controllers/AuthController');

const routes = [
    {
        method: 'POST',
        path: '/login',
        config: {
            auth: false
        },
        handler: Controller.login,
    },
];

module.exports = routes;
