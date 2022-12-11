/* https://www.kancloud.cn/yunye/axios/234845 */
import axios from "axios";

export class HttpProvider {
  constructor(baseURL, options = {}) {
    this.instance = axios.create({
      baseURL,
      ...options,
    });
  }

  init() {
    /* 配置选项定义一个自定义 HTTP 状态码的错误范围 */
    this.instance.defaults.validateStatus = (status) => {
      return status >= 200 && status < 300; // 默认的
    };
  }

  use(...plugins) {
    plugins.forEach((plugin) => {
      plugin.install?.(this.instance.interceptors);
    });
    /** 修正 request 順序 */
    this.instance.interceptors.request.handlers.reverse();
  }
}
