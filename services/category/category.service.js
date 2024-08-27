const CategoryModel = require('../../model/CategoryModel');
const { Op } = require('sequelize')
const { errorReponse } = require('../../core/reponseHandle')


class CategoryService {
    async createCategory(category) {
        const { name, avatarURL, description } = category

        if (!name) {
            throw new errorReponse({
                code: 401,
                message: 'Category name is required',
            })
        } else if (!avatarURL) {
            throw new errorReponse({
                code: 401,
                message: 'Category avatarURL is required',
            })
        } else if (!description) {
            throw new errorReponse({
                code: 401,
                message: 'Category description is required',
            })
        }

        const invalidCategory = CategoryModel.findOne({
            where: [{
                name: category.name
            }]
        })
        if (!invalidCategory) throw new errorReponse({
            code: 401,
            message: 'Category already exists',
        })

        const newCategory = CategoryModel.create(category);
        if (!newCategory) throw new errorReponse({
            code: 401,
            message: 'Category creation failed',
        })

        return newCategory;
    }

    async getCategories() {
        return await CategoryModel.findAll();
    }

    async getCategoryById(id) {
        const category = await CategoryModel.findByPk(id)

        if (!category) throw new errorReponse({
            code: 401,
            message: 'Category not found',
        })

        return category
    }

    async getCategoriesByName(name) {
        const categories = await CategoryModel.findAll({
            where: {
                name: {
                    [Op.like]: name
                }
            }
        })
        if (!categories) throw new errorReponse({
            code: 401,
            message: 'Categories not found',
        })

        return categories
    }

    async updateCategory(id, category) {
        const { name, avatarURL, description } = category

        if (!name) {
            throw new errorReponse({
                code: 401,
                message: 'Category name is required',
            })
        } else if (!avatarURL) {
            throw new errorReponse({
                code: 401,
                message: 'Category avatarURL is required'
            })
        } else if (!description) {
            throw new errorReponse({
                code: 401,
                message: 'Category description is required',
            })
        } else if(!id) {
            throw new errorReponse({
                code: 401,
                message: 'Category id is required',
            })
        }

        const updatedCategory = await CategoryModel.update(category, {
            where: { id }
        })

        if (!updatedCategory) throw new errorReponse({
            code: 401,
            message: 'Category update failed',
        })

        return updatedCategory
    }

    async deleteCategory(id) {
        const deletedCategory = await CategoryModel.destroy({
            where: { id }
        })

        if (!deletedCategory) throw new errorReponse({
            code: 401,
            message: 'Category delete failed',
        })

        return deletedCategory
    }
}

module.exports = new CategoryService();