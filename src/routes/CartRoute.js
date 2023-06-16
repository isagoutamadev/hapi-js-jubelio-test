const Controller = require('../controllers/CartController');

const routes = [
    {
        method: 'GET',
        path: '/cart/products',
        handler: Controller.getList,
    },
    {
        method: 'POST',
        path: '/cart/products',
        handler: Controller.create,
    },
    {
        method: 'PUT',
        path: '/cart/products/{product_id}',
        handler: Controller.update,
    },
    {
        method: 'DELETE',
        path: '/cart/products/{product_id}',
        handler: Controller.deleteData,
    },
];

module.exports = routes;