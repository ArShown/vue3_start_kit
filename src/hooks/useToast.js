/**
 * in component
 *
 * import { useToast } from "vue-toastification";
 * ...
 * setup() {
 *   // Get toast interface
 *   const toast = useToast();
 *   ...
 * }
 */
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  plugin: Toast,
  options: {
    transition: "Vue-Toastification__bounce",
    maxToasts: 6,
    closeOnClick: true,
    position: POSITION.BOTTOM_RIGHT,
    newestOnTop: true,
    hideProgressBar: true,
    timeout: 5000,
    draggable: false,
    rtl: false,
  },
};
