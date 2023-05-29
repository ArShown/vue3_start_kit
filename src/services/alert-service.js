import { defineService } from "@/_app/_define";
import { useAlertProvider } from "@/providers/alert-provider";

export const useAlertService = defineService("alert-service", {
  toast(message) {
    const provider = useAlertProvider();
    return provider.fire({
      icon: "success",
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      text: message,
    });
  },
});
