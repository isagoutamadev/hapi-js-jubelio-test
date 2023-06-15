const ProductService = require('../services/ProductService');

async function getListProducts(request, h) {
    const { page = 1, limit = 10 } = request.query;

    try {
        const products = await ProductService.getListProducts({page: Number(page), limit: Number(limit)});

        return h.response(products).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function getProductById(request, h) {
    const { id } = request.params;
    console.log(request.params);

    try {
        const product = await ProductService.getProductById(id);

        return h.response(product).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function createProduct(request, h) {
    const data = request.payload;

    try {
        const product = await ProductService.createProduct(data);

        return h.response(product).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function updateProduct(request, h) {
    const { id } = request.params;
    const product = request.payload;

    try {
        const result = await ProductService.updateProduct(id, product);

        return h.response(result).code(200);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.statusCode || 500);
    }
}

async function deleteProduct(request, h) {
    const { id } = request.params;

    try {
        await ProductService.deleteProduct(id);
        
        return h.response().code(204);
    } catch (error) {
        console.error(error);
        return h.response({ 
            error: error.message || 'Internal Server Error' 
        }).code(error.code || 500);
    }
}

module.exports = {
    getListProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
