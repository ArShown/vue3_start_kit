import { inject } from "vue";

export const useAlert = () => {
  return inject("alert-service");
};
