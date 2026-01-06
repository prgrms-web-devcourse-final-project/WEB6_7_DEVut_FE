import { useQuery } from "@tanstack/react-query";
import { myDelivery } from "../api/delivery.api";

export function useMyDelivery() {
  return useQuery({
    queryKey: ["my-delivery"],
    queryFn: myDelivery,
  });
}
