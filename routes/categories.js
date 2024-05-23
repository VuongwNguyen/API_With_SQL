const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/CategoryController');

/*
    Category API
    domain: http://localhost:7000/categories/
*/

router.get('/', async (req, res) => {
    res.json.status(200).json('api category ready');
});

/*
    API get all category
    domain: http://localhost:7000/categories/getAll
    method: GET
    this api only get all category with status = true
*/

router.get('/getAll', async function (req, res) {
    try {
        const result = await CategoryController.getAll();
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Get all category failed' });
        }
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});

/*
    API create category
    domain: http://localhost:7000/categories/create
    method: POST
*/

router.post('/create', async function (req, res) {
    try {
        const { name, description, image, } = req.body;
        const result = await CategoryController.create({ name, description, image });
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Create category failed' });
        }
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});

/*
    API update category
    domain: http://localhost:7000/categories/update
    method: POST
*/

router.post('/update', async function (req, res) {
    try {
        const { id, name, description, image } = req.body;
        const result = await CategoryController.update(id, { name, description, image });
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Update category failed' });
        }
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});

/*
    API delete category
    domain: http://localhost:7000/categories/remove
    method: POST
*/

router.post('/remove', async function (req, res) {
    try {
        const { id } = req.body;
        const result = await CategoryController.remove(id);
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Remove category failed' });
        }
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});







module.exports = router;