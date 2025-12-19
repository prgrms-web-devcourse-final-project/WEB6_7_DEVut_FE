import ClientApi from "@/lib/clientApi";

export const getDelayedProducts = async (params: GetProductsParams) => {
  const res = await ClientApi<DelayProductResponse>("/auction/delayed", {
    method: "GET",
    params: { ...params },
  });

  return res.data;
};
