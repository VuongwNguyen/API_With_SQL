var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var helmet = require("helmet");
var app = express();

const DB = require("./conf/Connection");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Start connection to database
async function start() {
  await DB.start();
}
start();

// Routes
app.use("/api", require("./routes/index"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.code || 500).json({
    message: err.message,
    status: err.status,
  });
  console.log(err.stack);
});

module.exports = app;
