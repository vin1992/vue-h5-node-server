/**
 * 项目配置文件
 */
const { getIPAddress } = require("../util");

let localHost = getIPAddress();

const config = {
  // node服务
  host: localHost,
  port: 3002,

  frontPort: 8081,

  // api服务
  apiHost: localHost,
  apiPort: 3030,

  //数据库服务
  dbHost: "127.0.0.1",
  dbPort: "27017",

  startMode: "develop", // 启动模式
  cluster: 1
};

module.exports = config;
