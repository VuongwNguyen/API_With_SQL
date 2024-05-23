const express = require('express');
const router = express.Router();
const CustomerController = require('../controller/CustomerController');

const sendmail = require('../services/sendmail');
const option = require('../services/option');
/*
    Customer API
    domain: http://localhost:7000/customers/
*/
router.get('/', (req, res) => {
    res.json('API Customer ready');
});

/*
    API create customer
    domain: http://localhost:7000/customers/create
    method: POST
*/

router.post('/create', async function (req, res) {
    try {
        const { name, age, address, password, email, phone } = req.body;
        const result = await CustomerController.create({ name, age, address, password, email, phone });
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Create customer failed' });
        }
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});

/*
    API login customer
    domain: http://localhost:7000/customers/login
    method: POST
*/

router.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body;

        const result = await CustomerController.login(username, password);
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Login failed' });
        }
        res.status(200).json({ status: true, data: result });

    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});

/*
    API update customer
    domain: http://localhost:7000/customers/update
    method: POST
*/

router.post('/update', async function (req, res) {
    try {
        const { id, data } = req.body;
        const result = await CustomerController.update(id, data);
        if (!result) {
            return res.status(400).json({ status: false, msg: 'Update customer failed' });
        }
        res.status(200).json({ status: true, data: result });
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});

/*
    API send email customer
    domain: http://localhost:7000/customers/sendmail
    method: POST
*/

router.post('/sendmail', async function (req, res) {
    try {
        const generateCode = () => {
            return Math.floor(100000 + Math.random() * 900000);
        }
        await sendmail(option(generateCode()));
        res.json('Send mail success');
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Error' });
        console.log(error);
    }
});



module.exports = router;