import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default {
  value: Toast,
  install: true,
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
