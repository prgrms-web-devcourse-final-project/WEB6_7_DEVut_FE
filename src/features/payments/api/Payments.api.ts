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
  const res = await ClientApi<HistoryPaymentsResponse>(
    "/payments/history/api/v1/payments/history?startDate=2025-12-01T00:00:00%2B09:00&endDate=2025-12-31T00:00:00%2B09:00&PaymentStatus=SUCCESS&page=0&size=20",
    {
      method: "GET",
    }
  );

  // if (res.resultCode !== "200") {
  //   throw new Error(res.msg);
  // }

  return res.data;
};
