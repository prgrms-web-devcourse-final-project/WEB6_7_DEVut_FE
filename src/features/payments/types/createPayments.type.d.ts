interface CreatePaymentsResponse {
  orderId: string;
  orderName: string;
  amount: number;
}

interface CreatePaymentsRequest {
  amount: number;
}

interface TossPaymentRequest {
  method: "CARD" | "TRANSFER" | "VIRTUAL_ACCOUNT";
  amount: {
    currency: "KRW";
    value: number;
  };
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
  customerEmail?: string;
  customerName?: string;
  customerMobilePhone?: string;
  card?: {
    useEscrow?: boolean;
    flowMode?: "DEFAULT" | "DIRECT";
    useCardPoint?: boolean;
    useAppCardOnly?: boolean;
  };
}
