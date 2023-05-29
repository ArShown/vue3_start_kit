import { defineService } from "@/_app/_define";
import { useHttpProvider } from "@/providers/http-provider/http-provider";
import logger from "@/providers/http-provider/interceptors/logger";
import request from "@/providers/http-provider/interceptors/request";
import response from "@/providers/http-provider/interceptors/response";

export const useHttpService = defineService("http-service", () => {
  const provider = useHttpProvider();

  provider.setbaseURL(import.meta.env.VITE_API_URL);

  /** registers */
  provider.use(request, import.meta.env.DEV ? logger : {}, response);

  return provider;
});
