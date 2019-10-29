/**
 * server.js
 * 一般用来 开启node服务，
 * 另外做一些 缓存啊，静态资源托管啊，api接口代理啊，webpack 热更新，等等
 * 主要是服务器层面的一些 stuff
 */

var path = require("path");
var express = require("express");
var favicon = require("serve-favicon");
var httpProxy = require("http-proxy");
var compression = require("compression");
var connectHistoryApiFallback = require("connect-history-api-fallback");
var config = require("../config/config");

const app = new express();
const port = config.port;

let target = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({ target });

//处理前端路由 静态文件引入
app.use("/", connectHistoryApiFallback());
app.use("/", express.static(path.join(__dirname, "../resource/project/dist")));

// api代理转换
app.use("/api", (req, res) => {
  console.log("proxy:", target);
  proxy.web(req, res, { target });
});

app.use(compression());
app.use(favicon(path.join(__dirname, "../resource/project/dist/favicon.ico")));

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(
      `===>  open http://${config.host}:${config.port} in a browser to view the app`
    );
  }
});
