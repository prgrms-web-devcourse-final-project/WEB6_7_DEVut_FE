import ClientApi from "@/lib/clientApi";

export const liveWishToggle = async ({ id }: { id: number }): Promise<boolean> => {
  const res = await ClientApi<boolean>(`/auction/live/${id}/like`, {
    method: "POST",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const delayedWishToggle = async ({ id }: { id: number }): Promise<boolean> => {
  const res = await ClientApi<boolean>(`/auction/delayed/${id}/like`, {
    method: "POST",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
