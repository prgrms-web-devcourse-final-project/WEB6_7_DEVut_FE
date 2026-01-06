import ClientApi from "@/lib/clientApi";

export const trade = async (params: {
  auctionType: "LIVE" | "DELAYED";
  dealId: string;
}): Promise<DealResponse> => {
  const res = await ClientApi<DealResponse>(
    `/users/me/deals/${params.auctionType}/${params.dealId}`,
    {
      method: "GET",
    }
  );

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
