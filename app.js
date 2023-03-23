const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const md5 = require("md5");
const { expressjwt } = require("express-jwt");
const unlessPath = require("./utils/unlessPath");
const { ForbiddenError, ErrorService } = require("./utils/errors");
const session = require("express-session");

// 默认读取根目录下 .env 文件作为环境变量
require("dotenv").config();
// 连接数据库
require("./dao/db");

require("express-async-errors");

const userRouter = require("./routes/user.js");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressjwt({
    secret: md5(process.env.JWT_SECRET),
    algorithms: ["HS256"],
  }).unless({
    path: unlessPath(),
  })
);

app.use("/api/admin", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err.name, "-------err.name");
  console.log(err.message, "-------err.message");
  if (err.name === "UnauthorizedError") {
    // token验证错误
    res.send(new ForbiddenError("未登录或登录已过期！").toResponseJson());
  } else if (err instanceof ErrorService) {
    res.send(err.toResponseJson());
  }
});

module.exports = app;
