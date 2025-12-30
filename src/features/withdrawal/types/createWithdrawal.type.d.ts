interface CreateWithdrawalResponse {
  withDrawId: number;
  status: string;
  msg: string;
  processedAt: null;
}

interface CreateWithdrawalRequest {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}
