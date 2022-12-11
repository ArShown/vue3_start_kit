//@ts-nocheck
/* https://www.kancloud.cn/yunye/axios/234845 */
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export class HttpProvider {
  instance: AxiosInstance;

  constructor(baseURL: string, options: AxiosRequestConfig = {}) {
    this.instance = axios.create({
      baseURL,
      ...options,
    });
  }

  init() {
    /* 配置选项定义一个自定义 HTTP 状态码的错误范围 */
    this.instance.defaults.validateStatus = (status: number) => {
      return status >= 200 && status < 300; // 默认的
    };
  }

  use(...plugins: Array<any>) {
    plugins.forEach((plugin) => {
      plugin.install?.(this.instance.interceptors);
    });
    /** 修正 request 順序 */
    //@ts-nocheck
    this.instance.interceptors.request.handlers.reverse();
  }
}
