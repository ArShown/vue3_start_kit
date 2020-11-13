/**
 * in component
 *
 * import useToast from "@/hooks/use-toast";
 * ...
 * setup() {
 *   // Get toast interface
 *   const toast = useToast();
 *   ...
 * }
 */
import Toast, { POSITION, useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

export const install = {
  plugin: Toast,
  options: {
    transition: "Vue-Toastification__bounce",
    maxToasts: 6,
    closeOnClick: true,
    position: POSITION.TOP_RIGHT,
    newestOnTop: true,
    hideProgressBar: true,
    timeout: 5000,
    draggable: false,
    rtl: false,
  },
};

export default useToast;
