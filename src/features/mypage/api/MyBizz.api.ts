import ClientApi from "@/lib/clientApi";

export const getMyBizz = async () => {
  const res = await ClientApi<MyBizzResponse>("/wallet/bizz", {
    method: "GET",
  });

  return res.data.bizz;
};
