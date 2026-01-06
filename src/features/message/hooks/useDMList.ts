import { useQuery } from "@tanstack/react-query";
import { DMList } from "../api/message.api";

export function useDMList() {
  return useQuery({
    queryKey: ["dm-list"],
    queryFn: DMList,
    staleTime: 0, // 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
