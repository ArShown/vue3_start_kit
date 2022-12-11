/**
 * doc
 * @link https://sweetalert2.github.io/
 */
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export class AlertProvider {
  constructor() {
    return Swal.mixin({
      reverseButtons: true,
      heightAuto: false,
      focusConfirm: false,
      buttonsStyling: false,
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      didOpen(popup) {
        const cancelBtn = popup.querySelector(".swal2-cancel");
        const confirmBtn = popup.querySelector(".swal2-confirm");
        confirmBtn.blur();
        cancelBtn.blur();
      },
    });
  }
}
