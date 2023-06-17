const Controller = require('../controllers/OrderController');

const routes = [
    {
        method: 'GET',
        path: '/orders',
        handler: Controller.getList,
    },
    {
        method: 'GET',
        path: '/orders/{id}',
        handler: Controller.getById,
    },
    {
        method: 'PUT',
        path: '/orders/{id}/confirm',
        handler: Controller.confirm,
    },
    {
        method: 'PUT',
        path: '/orders/{id}/otw',
        handler: Controller.otw,
    },
    {
        method: 'PUT',
        path: '/orders/{id}/success',
        handler: Controller.success,
    },
    {
        method: 'DELETE',
        path: '/orders/{id}',
        handler: Controller.deleteData,
    },
];

module.exports = routes;