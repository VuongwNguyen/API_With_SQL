const router = require('express').Router();

const AccountController = require('../controller/account.controller');

const asyncHandler = require('../core/asyncHandler');


router.post('/login', asyncHandler(AccountController.loginAccount));
router.post('/register', asyncHandler(AccountController.registerAccount));



module.exports = router;