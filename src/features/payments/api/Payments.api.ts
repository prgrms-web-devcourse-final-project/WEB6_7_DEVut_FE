import ClientApi from "@/lib/clientApi";

export const createPayments = async ({ amount }: { amount: number }) => {
  const res = await ClientApi<CreatePaymentsResponse>("/payments", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }
  return res.data;
};

export const approvePayments = async (
  payload: ApprovePaymentsRequest
): Promise<ApprovePaymentsResponse> => {
  const res = await ClientApi<ApprovePaymentsResponse>("/payments/confirm", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const historyPayments = async (): Promise<HistoryPaymentsResponse> => {
  const res = await ClientApi<HistoryPaymentsResponse>("/payments/history", {
    method: "GET",
    params: {
      startDate: "2025-12-01",
      endDate: "2026-01-15",
      PaymentStatus: "SUCCESS",
      page: 0,
      size: 20,
    },
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const payBalance = async (dealId: string) => {
  const res = await ClientApi(`/users/me/deals/live/${dealId}/payment`, {
    method: "POST",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
