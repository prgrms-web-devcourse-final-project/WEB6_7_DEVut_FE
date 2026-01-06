import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLiveRoomProducts, liveBid } from "../../api/liveAuctionRoom.api";
import { ApiError } from "next/dist/server/api-utils";

export const useRoomProducts = (roomId?: number) => {
  return useQuery({
    queryKey: ["live-room-products", roomId],
    queryFn: () => getLiveRoomProducts(roomId!),
    enabled: !!roomId,
  });
};

export const useLiveBid = () => {
  return useMutation<LiveBidResponse, ApiError, LiveBidRequest>({
    mutationFn: (body: LiveBidRequest) => liveBid(body),
  });
};
