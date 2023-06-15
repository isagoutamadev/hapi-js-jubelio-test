const Controller = require('../controllers/ProductController');

const routes = [
    {
        method: 'GET',
        path: '/products',
        handler: Controller.getList,
    },
    {
        method: 'GET',
        path: '/products/{id}',
        handler: Controller.getById,
    },
    {
        method: 'POST',
        path: '/products',
        handler: Controller.create,
    },
    {
        method: 'PUT',
        path: '/products/{id}',
        handler: Controller.update,
    },
    {
        method: 'DELETE',
        path: '/products/{id}',
        handler: Controller.deleteData,
    },
];

module.exports = routes;
