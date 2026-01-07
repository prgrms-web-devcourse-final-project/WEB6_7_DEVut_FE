import { useQuery } from "@tanstack/react-query";
import { trade } from "../api/trade.api";

export function useTradeDetail(params: { auctionType: "LIVE" | "DELAYED"; dealId: string }) {
  return useQuery({
    queryKey: ["trade-detail", params.auctionType, params.dealId],
    queryFn: () => trade(params),
    enabled: !!params.dealId,
  });
}
