const Category = require('../model/CategoryModel');

const { Op } = require('sequelize');

async function getAll() {
    try {
        const categories = await Category.findAll({
            where: {
                status: true
            }
        });
        return categories;
    } catch (error) {
        console.log('Error', error);
        return null;
    }
}

async function create(data) {
    try {
        const invalidCategory = await Category.findOne({
            where: {
                name: data.name
            }
        });

        if (invalidCategory) {
            return null;
        }

        const category = await Category.create(data);
        return category;
    } catch (error) {
        console.log('Error', error);
        return null;
    }
}

async function update(id, data) {
    try {
        const category = await Category.findByPk(id);
        // kiểm tra trùng tên nếu trùng với id khác thì không cho update
        const invalidCategory = await Category.findOne({
            where: {
                name: data.name,
                id: {
                    [Op.ne]: id
                }
            }
        });
        if (invalidCategory) {
            return null;
        }
        if (!category) {
            return null;
        }

        await category.update(data);
        return category;
    } catch (error) {
        console.log('Error', error);
        return null;
    }
}

async function remove(id) {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return null;
        }
        await category.update({ status: false });
        return category;
    } catch (error) {
        console.log('Error', error);
        return null;
    }
}


module.exports = { create, update, getAll, remove };