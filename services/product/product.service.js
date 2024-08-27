const ProductModel = require("../../model/ProductModel");
const { errorReponse } = require('../../core/reponseHandle')
const { Op } = require('sequelize')

class ProductService {
    async createProduct(product) {
        const { name, price, description, categoryID, avatarURL } = product;
        if (!name) {
            throw new errorReponse({
                code: 401,
                message: 'Name is required',
            })
        } else if (!price) {
            throw new errorReponse({
                code: 401,
                message: 'Price is required',
            })
        } else if (!categoryID) {
            throw new errorReponse({
                code: 401,
                message: 'Category is required',
            })
        } else if (!avatarURL) {
            throw new errorReponse({
                code: 401,
                message: 'Avatar is required',
            })
        } else if (!description) {
            throw new errorReponse({
                code: 401,
                message: 'Description is required',
            })
        }

        const invalidProduct = ProductModel.findOne({
            where: [{
                name: product.name
            }]
        })
        if (!invalidProduct) throw new errorReponse({
            code: 401,
            message: 'Product already exists',
        })


        const newProduct = ProductModel.create(product);
        if (!newProduct) throw new errorReponse({
            code: 401,
            message: 'Product creation failed',
        })


        return newProduct;
    }

    async getProducts() {
        return await ProductModel.findAll();
    }

    async getProductById(id) {
        const product = ProductModel.findByPk(id);
        if (!product) throw new errorReponse({
            code: 401,
            message: 'Product not found',
        })

        return product;
    }

    async getProductsByName(name) {
        const products = ProductModel.findAll({
            where: {
                name: {
                    [Op.like]: name
                }
            }
        });
        if (!products) throw new errorReponse({
            code: 401,
            message: 'Product not found',
        })

        return products;
    }

    async getProductsByCategory(categoryId) {
        const products = ProductModel.findAll({
            where: {
                categoryId: categoryId
            }
        });
        if (!products) throw new errorReponse({
            code: 401,
            message: 'Product not found',
        })

        return products;
    }

    async updateProduct(id, product) {
        const { name, price, description, categoryID, avatarURL } = product;
        if (!name) {
            throw new errorReponse({
                code: 401,
                message: 'Name is required',
            })
        } else if (!price) {
            throw new errorReponse({
                code: 401,
                message: 'Price is required',
            })
        } else if (!categoryID) {
            throw new errorReponse({
                code: 401,
                message: 'Category is required',
            })
        } else if (!avatarURL) {
            throw new errorReponse({
                code: 401,
                message: 'Avatar is required',
            })
        } else if (!description) {
            throw new errorReponse({
                code: 401,
                message: 'Description is required',
            })
        } else if (!id) {
            throw new errorReponse({
                code: 401,
                message: 'Id is required',
            })
        }

        const productUpdate = ProductModel.update(product, {
            where: {
                id: id
            }
        });

        if (!productUpdate) throw new errorReponse({
            code: 401,
            message: 'Product update failed',
        })

        return productUpdate;
    }

    async deleteProduct(id) {
        const productDelete = ProductModel.destroy({
            where: {
                id: id
            }
        });
        if(!productDelete) throw new errorReponse({
            code: 401,
            message: 'Product delete failed',
        })

        return productDelete;
    }
}
module.exports = new ProductService();