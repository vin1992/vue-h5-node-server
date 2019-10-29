import axios from "axios";
import conf from "../../../../config/config";

const request = axios.create();

request.defaults.timeout = 2500;

request.interceptors.request.use(
  function(config) {
    console.log("conf:", conf);
    // 在发送请求之前做些什么
    let url = config.url;
    // config.url = `//${location.hostname}:${conf.port}` + url;
    config.url = `//192.168.1.105:${conf.port}` + url;
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.status == 200) {
      return response.data;
    } else {
      return Promise.reject("请求出错");
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default request;
