var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var helmet = require('helmet')

var { start } = require('./conf/Connection');

const productsRouter = require('./routes/products');
const customersRouter = require('./routes/customers');
const categoriesRouter = require('./routes/categories');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

// Start connection to database
start();

// Routes
app.use('/products', productsRouter);
app.use('/customers', customersRouter);
app.use('/categories', categoriesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
    urlError: req.url
  });


});



module.exports = app;
