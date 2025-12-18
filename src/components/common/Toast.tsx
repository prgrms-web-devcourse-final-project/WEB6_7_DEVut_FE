"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/css/toast.css";

export type ToastType = "SUCCESS" | "ERROR" | "INFO";

export default function Toast({ message, type }: { message: string; type: ToastType }) {
  switch (type) {
    case "SUCCESS":
      return toast.success(message, {
        className: "toast-success",
      });
    case "ERROR":
      return toast.error(message, {
        className: "toast-error",
      });
    case "INFO":
      return toast.info(message, {
        className: "toast-info",
      });
    default:
      return null;
  }
}
