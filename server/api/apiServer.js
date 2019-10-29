/**
 * api 服务器 负责将 前后端 不同地 请求路由 分发到 不同的 api 接口当中
 * 这些api接口 会处理一些 数据库的增删改查啊，session登录校验啊 等等 后端的一些api上的处理逻辑
 */

const express = require("express");
const config = require("../../config/config");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cookieParser = require("cookie-parser");
let session = require("express-session");

const port = config.apiPort;
const app = new express();

app.use(bodyParser.json()); // 解析json

app.use(bodyParser.urlencoded({ extended: false })); // url 参数 编码

app.use(cookieParser("express_react_cookie"));
app.use(
  session({
    secret: "express_react_cookie",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30 } //过期时间
  })
);

// 后端页面请求 url 路由 分发
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use("/admin", require("./admin"));

var mongoDB = `mongodb://${config.dbHost}:${config.dbPort}/build`;

mongoose.connect(mongoDB, function(err) {
  if (err) {
    console.error(err, "数据库连接失败");
    return;
  }
  console.info("数据库连接成功");
  app.listen(port, function(err) {
    if (err) {
      console.error("err:", err);
    } else {
      console.info(
        `===> api server is running at ${config.apiHost}:${config.apiPort}`
      );
    }
  });
});
mongoose.Promise = global.Promise;
