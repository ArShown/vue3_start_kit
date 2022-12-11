import { AlertProvider } from "@/providers/alert-provider";

export class AlertService {
  constructor() {
    this.provider = new AlertProvider();
  }

  async toast(message) {
    return this.provider.fire({
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      text: message,
    });
  }
}

AlertService.prototype.install = function install(app) {
  const provideName = "alert-service";
  app.config.globalProperties[provideName] = this;
  app.provide(provideName, this);
};

export default new AlertService();
