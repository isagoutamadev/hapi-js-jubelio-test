const ProductController = require('../controllers/ProductController');

const routes = [
    {
        method: 'GET',
        path: '/products',
        handler: ProductController.getListProducts,
    },
    {
        method: 'GET',
        path: '/products/{id}',
        handler: ProductController.getProductById,
    },
    {
        method: 'POST',
        path: '/products',
        handler: ProductController.createProduct,
    },
    {
        method: 'PUT',
        path: '/products/{id}',
        handler: ProductController.updateProduct,
    },
    {
        method: 'DELETE',
        path: '/products/{id}',
        handler: ProductController.deleteProduct,
    },
];

module.exports = routes;
