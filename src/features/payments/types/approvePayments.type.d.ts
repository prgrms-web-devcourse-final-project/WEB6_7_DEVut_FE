interface ApprovePaymentsRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

interface ApprovePaymentsResponse {
  paymentId: number;
  status: string;
  amount: number;
  approvedAt: string;
}
