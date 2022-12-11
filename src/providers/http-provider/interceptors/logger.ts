import type {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

type AxiosInterceptors = {
  request: AxiosInterceptorManager<AxiosRequestConfig>;
  response: AxiosInterceptorManager<AxiosResponse>;
};

export default {
  install: (register: AxiosInterceptors) => {
    register.request.use(
      (config) => {
        console.debug(
          "API REQUEST:",
          config.method?.toUpperCase(),
          config.url,
          config.params || "",
          config.data || ""
        );
        return config;
      },
      (error: AxiosError) => {
        console.error(
          "API REQUEST FAILED:",
          error.response?.config.method?.toUpperCase(),
          error.response?.config.url,
          error.response
        );
        return Promise.reject(error);
      }
    );
    register.response.use(
      (response) => {
        console.debug(
          "%cAPI RESPONSE: " +
            `${response.config.method?.toUpperCase()} ` +
            `${response.config.url}`,
          "color:green;",
          response
        );
        return response;
      },
      (error: AxiosError) => {
        if (error && error.response) {
          console.error(
            "API RESPONSE FAILED:",
            error.response.config.method?.toUpperCase(),
            error.response.config.url,
            error.response
          );
        }
        return Promise.reject(error);
      }
    );
  },
};
