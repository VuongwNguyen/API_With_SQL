const express = require('express');
const router = express.Router();
const ProductController = require('../controller/ProductController');

/*
    Product API
    domain: http://localhost:7000/products/
*/

router.get('/', (req, res) => {
    res.json('Products api');
});

/*
    API get all products
    domain: http://localhost:7000/products/getAll
    method: GET
    this api only get all products with status = true
*/

router.get('/getAll', async (req, res) => {
    try {
        const result = await ProductController.getAll();
        if (!result) {
            return res.status(400).json({ message: 'Get all products failed' });
        }
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
});

/*
    API create product
    domain: http://localhost:7000/products/create
    method: POST
*/

router.post('/create', async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const product = {
            name: name,
            price: price,
            quantity: quantity
        };
        const result = await ProductController.create(product);
        res.json({ message: 'Product created', data: result });
    } catch (error) {
        res.json(error.message);
    }
});

/*
    API update product
    domain: http://localhost:7000/products/update
    method: POST
*/

router.post('/update', async (req, res) => {
    try {
        const { id, name, price, quantity } = req.body;
        const product = {
            id: id,
            name: name,
            price: price,
            quantity: quantity
        };
        const result = await ProductController.update(product);
        res.json({ message: 'Product updated', data: result });
    } catch (error) {
        res.json(error.message);
    }
});

/*
    API remove product
    domain: http://localhost:7000/products/remove
    method: POST
*/

router.post('/remove', async (req, res) => {
    try {
        const { id } = req.body;
        const result = await ProductController.remove(id);
        res.json({ message: 'Product removed', data: result });
    } catch (error) {
        res.json(error.message);
    }
});

/*
    API get product by id
    domain: http://localhost:7000/products/getById
    method: GET
*/

router.get('/getById', async (req, res) => {
    try {
        const { id } = req.body;
        const result = await ProductController.getById(id);
        res.json({ data: result });
    } catch (error) {
        res.json(error.message);
    }
});

/*
    API get product by name
    domain: http://localhost:7000/products/searchByName
    method: GET
*/

router.get('/searchByName', async (req, res) => {
    try {
        const { key } = req.body;
        const result = await ProductController.searchByName(key);
        res.json({ data: result });
    } catch (error) {
        res.json(error.message);
    }
});

/*
    API get product by category
    domain: http://localhost:7000/products/getByCategory
    method: GET
*/

router.get('/getByCategory', async (req, res) => {
    try {
        const { categoryId } = req.body;
        const result = await ProductController.getByCategory(categoryId);
        res.json({ data: result });
    } catch (error) {
        res.json(error.message);
    }
});


module.exports = router;