import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth.api";

export function useSignUp() {
  return useMutation({
    mutationFn: signup,
  });
}
