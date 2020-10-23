/**
 * doc
 * @link https://sweetalert2.github.io/
 */
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  alias: "$swal",
  value: Swal.mixin({
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }),
};
