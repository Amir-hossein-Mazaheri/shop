import { useMemo } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface UseAlertOptions {
  timer?: number;
  progressBar?: boolean;
  hasConfirm?: boolean;
}

const SweetToast = withReactContent(Swal);

const useAlert = (
  { timer, progressBar, hasConfirm }: UseAlertOptions = {
    timer: 3000,
    progressBar: true,
    hasConfirm: false,
  }
) => {
  const Alert = useMemo(
    () =>
      SweetToast.mixin({
        toast: true,
        position: "top-right",
        timer: timer,
        timerProgressBar: progressBar,
        showConfirmButton: hasConfirm,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }),
    [progressBar, timer]
  );

  return Alert;
};

export default useAlert;
