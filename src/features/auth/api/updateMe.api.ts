import ClientApi from "@/lib/clientApi";

export const updateMe = async (payload: {
  email: string;
  nickname: string;
  image: string | null;
}) => {
  const res = await ClientApi("/api/v1/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error();
  }

  return res.data;
};
