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
