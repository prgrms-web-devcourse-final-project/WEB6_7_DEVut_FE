import ClientApi from "@/lib/clientApi";

export const createWithdrawal = async (
  payload: CreateWithdrawalRequest
): Promise<CreateWithdrawalResponse> => {
  const res = await ClientApi<CreateWithdrawalResponse>("/wallet/withdrawal", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const historyWithdrawals = async (): Promise<HistoryWalletsResponse> => {
  const res = await ClientApi<HistoryWalletsResponse>("/wallet/histories", {
    method: "GET",
  });

  return res.data;
};
