import { ToastType } from "@/src/contexts/dashboard/dashboard.interface";

let showToastCallback: ((message: string, type?: ToastType) => void) | null =
  null;

export function setToastCallback(
  callback: (message: string, type?: ToastType) => void
) {
  showToastCallback = callback;
}

export function showGlobalToast(message: string, type: ToastType = "info") {
  if (showToastCallback) {
    showToastCallback(message, type);
  }
}
