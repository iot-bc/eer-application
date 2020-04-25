/**
 * @Author: xyf @Ubuntu18.04
 * @Created: 2020/4/19 下午7:10
 * @Filename: app.js
 * @Function: do nothing >_>
 */

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

const connect = require("./utils/db");

const app = express();
connect();

/*
   Listen Port
 */
const PORT = 3000;
app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

/*
   Use Third-Party Middleware extensions
 */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "dist")));

/*
   ROUTES
 */
const indexRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const deviceRouter = require("./routes/device");
const testRouter = require("./routes/test");

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/device", deviceRouter);
app.use("/test", testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next();
});

module.exports = app;
