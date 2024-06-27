const router = require('express').Router();
const accountRouter = require('./account.routes');

router.use('/account', accountRouter);


module.exports = router;
