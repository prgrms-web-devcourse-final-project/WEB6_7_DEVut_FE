interface Withdrawal {
  withdrawalId: number;
  userId: number;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: string;
  msg: string | null;
  processedAt: string | null;
  createdAt: string;
}

interface HistoryWithdrawalsResponse {
  withdrawals: Withdrawal[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}
