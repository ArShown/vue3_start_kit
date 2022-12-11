//@ts-nocheck
import { HttpProvider } from "@/providers/http-provider/http-provider";
import logger from "@/providers/http-provider/interceptors/logger";
import transfer from "@/providers/http-provider/interceptors/transfer";

export class HttpService {
  provider: HttpProvider;

  constructor() {
    let hostname = window.location.hostname;
    if (!hostname.startsWith("www.")) {
      hostname = "www." + hostname;
    }
    const [, ...domain] = hostname.split(".");
    const baseURL = import.meta.env.VITE_API_URL.replace("{domain}", domain);
    this.provider = new HttpProvider(baseURL);
    this.init();
  }

  init() {
    this.provider.use(import.meta.env.DEV ? logger : {}, transfer);
  }

  get get() {
    return this.provider.instance.get;
  }

  get post() {
    return this.provider.instance.post;
  }

  get put() {
    return this.provider.instance.put;
  }

  get delete() {
    return this.provider.instance.delete;
  }
}

HttpService.prototype.install = function install(app) {
  const provideName = "http-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default new HttpService();
