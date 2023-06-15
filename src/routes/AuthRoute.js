const Controller = require('../controllers/AuthController');

const routes = [
    {
        method: 'POST',
        path: '/login',
        handler: Controller.login,
    },
];

module.exports = routes;
