const ProductModel = require('../models/ProductModel');

async function getListProducts({page, limit}) {
    try {
        const products = await ProductModel.getProducts({page, limit});
        return products;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    try {
        const product = await ProductModel.getProductById(id);
        if (product) {
            return product;
        }

        throw { statusCode: 404, message: "Product not found"};
    } catch (error) {
        throw error;
    }
}

async function createProduct(data) {
    try {
        const product = await ProductModel.createProduct(data);

        return h.response(product).code(200);
    } catch (error) {
        throw error;
    }
}

async function updateProduct(id, data) {
    try {
        const product = await ProductModel.updateProduct(id, data);

        if (product) {
            return product;
        }

        throw { statusCode: 404, message: "Product not found"};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        const deleted = await ProductModel.deleteProduct(id);
        if (deleted) {
            return deleted;
        }

        throw { statusCode: 404, message: "Product not found"};
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getListProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
