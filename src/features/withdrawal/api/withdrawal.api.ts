import ClientApi from "@/lib/clientApi";

export const createWithdrawal = async (
  payload: CreateWithdrawalRequest
): Promise<CreateWithdrawalResponse> => {
  const res = await ClientApi<CreateWithdrawalResponse>("/wallets/withdrawal", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
