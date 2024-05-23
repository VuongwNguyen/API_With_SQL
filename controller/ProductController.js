const ProductModel = require('../model/ProductModel');


async function getAll() {
    try {
        const products = await ProductModel.findAll({
            where: {
                status: true
            }
        });
        return products;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

async function create(product) {
    try {
        const invalidProduct = await ProductModel.findOne({
            where: {
                name: product.name
            }
        });
        if (invalidProduct) {
            return null;
        }
        const newProduct = await ProductModel.create(product);
        return newProduct;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

async function update(product) {
    try {
        const productUpdate = await ProductModel.update(product, {
            where: {
                id: product.id
            }
        });
        return productUpdate;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

async function remove(id) {
    try {
        const productRemove = await ProductModel.update({ status: false }, {
            where: {
                id: id
            }
        });
        return productRemove;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

async function getById(id) {
    try {
        const product = await ProductModel.findOne({
            where: {
                id: id
            }
        });
        return product;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

async function searchByName(key) {
    try {
        const products = await ProductModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${key}%`
                }
            }
        });
        return products;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

async function getByCategory(categoryId) {
    try {
        const products = await ProductModel.findAll({
            where: {
                categoryId: categoryId
            }
        });
        return products;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = { getAll, create, update, remove, getById, searchByName, getByCategory };