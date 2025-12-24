interface History {
  paymentId: number;
  PaymentDate: string;
  amount: number;
  status: string;
  description: string;
}

interface HistoryPaymentsResponse {
  payments: History[];
  totalPages: number;
  totalElements: number;
  currentPages: number;
}
