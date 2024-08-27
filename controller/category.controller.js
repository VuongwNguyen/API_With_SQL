const CategoryService = require('../services/category/category.service');
const { successfullyReponse } = require('../core/reponseHandle');


class CategoryController {
    async createCategory(req, res, next) {
        const {
            avatarURL,
            name,
            description
        } = req.body;

        await CategoryService.createCategory({ avatarURL, name, description });
        return new successfullyReponse({
            data: {},
            message: "Create category successfully",
            status: 201,
        }).json(res);
    }

    async getCategories(req, res, next) {
        return new successfullyReponse({
            data: await CategoryService.getCategories(),
            message: 'Get categories successfully'
        }).json(res)
    }

    async getCategoryById(req, res, next) {
        const { id } = req.params;
        return new successfullyReponse({
            data: await CategoryService.getCategoryById(id),
            message: 'Get category successfully'
        }).json(res)
    }

    async getCategoriesByName(req, res, next) {
        const { name } = req.body;
        return new successfullyReponse({
            data: await CategoryService.getCategoriesByName(name),
            message: 'Get categories by name successfully'
        }).json(res)
    }

    async updateCategory(req, res, next) {
        const { avatarURL, name, description, id } = req.body;
        return new successfullyReponse({
            data: await CategoryService.updateCategory(id, { avatarURL, name, description }),
            message: 'Update category successfully'
        }).json(res)
    }

    async deleteCategory(req, res, next) {
        const { id } = req.params;
        return new successfullyReponse({
            data: await CategoryService.deleteCategory(id),
            message: 'Delete category successfully'
        }).json(res)
    }


}

module.exports = new CategoryController