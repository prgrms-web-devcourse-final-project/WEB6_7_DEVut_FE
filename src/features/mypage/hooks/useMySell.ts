import { useQuery } from "@tanstack/react-query";
import { mySell } from "../api/MyPage.api";

export function useMySell() {
  return useQuery({
    queryKey: ["my-sell"],
    queryFn: mySell,
  });
}
