/* https://www.kancloud.cn/yunye/axios/234845 */
import axios from "axios";
import { defineProvider } from "@/_app/_define";

export const useHttpProvider = defineProvider(() => {
  const instance = axios.create();

  /* 配置选项定义一个自定义 HTTP 状态码的错误范围 */
  instance.defaults.validateStatus = (status) => {
    return status >= 200 && status < 300; // 默认的
  };

  instance.setbaseURL = (url) => {
    instance.defaults.baseURL = url;
  };

  instance.use = function use(...plugins) {
    plugins.forEach((plugin) => {
      plugin.install?.(instance.interceptors);
    });
    /** 修正 request 順序 */
    instance.interceptors.request.handlers.reverse();
  };

  return instance;
});
