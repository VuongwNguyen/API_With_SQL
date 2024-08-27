const ProductService = require('../services/product/product.service');
const { successfullyReponse } = require('../core/reponseHandle');

class ProductController {
    async createProduct(req, res, next) {
        const { name, price, description, categoryID, avatarURL } = req.body;
        await ProductService.createProduct({ name, price, description, categoryID, avatarURL});
        return new successfullyReponse({
            data: {},
            message: "Create product successfully",
            status: 201,
        }).json(res);
    }

    async updateProduct(req, res, next) {
        const { id } = req.params;
        const { name, price, description, categoryId } = req.body;
        await ProductService.updateProduct({ id, name, price, description, categoryId });
        return new successfullyReponse({
            data: {},
            message: "Update product successfully",
        }).json(res);
    }

    async deleteProduct(req, res, next) {
        const { id } = req.params;
        await ProductService.deleteProduct({ id });
        return new successfullyReponse({
            data: {},
            message: "Delete product successfully",
        }).json(res);
    }

    async getProductById(req, res, next) {
        const { id } = req.params;
        const product = await ProductService.getProductById({ id });
        return new successfullyReponse({
            data: product,
            message: "Get product successfully",
        }).json(res);
    }

    async getProductByName(req, res, next){
        const { name } = req.params;
        const product = await ProductService.getProductByName({ name });
        return new successfullyReponse({
            data: product,
            message: "Get product successfully",
        }).json(res);
    }

    async getProductByCategory(req,res,next){
        const { categoryId } = req.params;
        const product = await ProductService.getProductByCategory({ categoryId });
        return new successfullyReponse({
            data: product,
            message: "Get product successfully",
        }).json(res);
    }

    async getProducts(req, res, next) {
        const products = await ProductService.getProducts();
        return new successfullyReponse({
            data: products,
            message: "Get products successfully",
        }).json(res);
    }
}

module.exports = new ProductController;