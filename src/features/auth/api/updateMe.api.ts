import ClientApi from "@/lib/clientApi";

type UpdateMePayload = {
  email: string;
  nickname: string;
  image: string | null;
  address: string | null;
  addressDetail: string | null;
  postalCode: string | null;
};

export const updateMe = async (payload: UpdateMePayload) => {
  const res = await ClientApi<{
    id: number;
    email: string;
    nickname: string;
    image: string | null;
    modifyDate: string;
    address: string | null;
    addressDetail: string | null;
    postalCode: string | null;
  }>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
