interface CreatePaymentsResponse {
  orderId: string;
  orderName: string;
  amount: number;
}

interface CreatePaymentsRequest {
  amount: number;
}
