import { useQuery } from "@tanstack/react-query";
import { DMList } from "../api/message.api";

export function useDMList() {
  return useQuery({
    queryKey: ["dm-list"],
    queryFn: DMList,
    staleTime: 1000 * 60, // 1분간 캐시 유지 (소켓 및 낙관적 업데이트 신뢰)
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
}
