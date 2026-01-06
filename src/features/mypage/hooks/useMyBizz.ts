import { useQuery } from "@tanstack/react-query";
import { getMyBizz } from "../api/MyBizz.api";

export const useGetMyBizz = () => {
  return useQuery({
    queryKey: ["my-bizz"],
    queryFn: getMyBizz,
  });
};
