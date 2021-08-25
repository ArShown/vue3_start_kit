/* https://www.kancloud.cn/yunye/axios/234845 */
import axios from "axios";
import swal from "sweetalert2";
import store from "@/store";

const instance = axios.create();

instance.defaults.baseURL = "/api";

/* 識別請求來源相同 */
instance.defaults.withCredentials = true;

/* 配置选项定义一个自定义 HTTP 状态码的错误范围 */
instance.defaults.validateStatus = (status) => {
  return status >= 200 && status < 300; // 默认的
};
/* csrf */
// instance.defaults.xsrfCookieName = 'XSRF-TOKEN';
// instance.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

/* 逾時 ： 10 秒 */
// instance.defaults.timeout = 10000;

/* customs */
instance.defaults._silent_ = false;

const _getAPIDesc = (config) => `[${config.method.toUpperCase()}]${config.url}`;

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    console.debug(
      "API REQUEST:",
      config.method.toUpperCase(),
      config.url,
      config.params || "",
      config.data || ""
    );
    /* 存入請求佇列 */
    store.commit("app/add/loadingApiQueue", _getAPIDesc(config));
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.error(
      "API REQUEST FAILED:",
      error.response.config.method.toUpperCase(),
      error.response.config.url,
      error.response
    );
    return Promise.reject(error);
  }
);

const requestCatcher = (config) => {
  instance.defaults._silent_ = false;
  store.commit("app/remove/loadingApiQueue", _getAPIDesc(config));
};

/* 把回傳的結果往下丟 */
instance.interceptors.response.use(
  function (response) {
    console.debug(
      "%cAPI RESPONSE: " +
        `${response.config.method.toUpperCase()} ` +
        `${response.config.url}`,
      "color:green;",
      response
    );

    if (!response.config._silent_) {
      const code = response.data.code;
      if (code !== 0) swal.fire("API Error");
    }

    requestCatcher(response.config);
    return response.data;
  },
  function (error) {
    console.error(
      "API RESPONSE FAILED:",
      error.response.config.method.toUpperCase(),
      error.response.config.url,
      error.response
    );
    requestCatcher(error.response.config);
    swal.fire("API Error");
    return Promise.reject(error.response.data);
  }
);

/* 要不要彈錯誤訊息 */
instance.silent = function silent() {
  instance.defaults._silent_ = true;
  return instance;
};

export default instance;
