const router = require('express').Router();

const CategoryController = require('../controller/category.controller');

const asyncHandler = require('../core/asyncHandler');

router.post('/createCategory', asyncHandler(CategoryController.createCategory));
router.get('/getCategories', asyncHandler(CategoryController.getCategories));
router.post('/getCategoryById/:id', asyncHandler(CategoryController.getCategoryById));
router.get('/getCategoriesByName/:name', asyncHandler(CategoryController.getCategoriesByName));
router.put('/updateCategory', asyncHandler(CategoryController.updateCategory));
router.delete('/deleteCategory/:id', asyncHandler(CategoryController.deleteCategory));

module.exports = router;