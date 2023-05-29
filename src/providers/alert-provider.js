/**
 * doc
 * @link https://sweetalert2.github.io/
 */
import Swal from "sweetalert2";
import { defineProvider } from "@/_app/_define";
import "sweetalert2/dist/sweetalert2.min.css";

export const useAlertProvider = defineProvider(() => {
  return Swal.mixin({
    reverseButtons: true,
    heightAuto: false,
    focusConfirm: false,
    buttonsStyling: false,
    allowOutsideClick: false,
    allowEnterKey: false,
    allowEscapeKey: false,
  });
});
