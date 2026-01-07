import { useQuery } from "@tanstack/react-query";
import { myWallet } from "../api/Payments.api";

export function useMyWallet() {
  return useQuery({
    queryKey: ["my-wallet"],
    queryFn: myWallet,
  });
}
