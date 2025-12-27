export const mapPaymentsToBizzLog = (payments: History[] = []): BizzLogItem[] =>
  payments.map(p => ({
    id: `CHARGE-${p.paymentId}`,
    kind: "CHARGE",
    label: "충전",
    date: p.PaymentDate,
    amount: p.amount,
    signedAmount: p.amount,
  }));

export const mapWithdrawalsToBizzLog = (withdrawals: Withdrawal[] = []): BizzLogItem[] =>
  withdrawals.map(w => ({
    id: `WITHDRAW-${w.withdrawalId}`,
    kind: "WITHDRAW",
    label: "출금",
    date: w.createdAt,
    amount: w.amount,
    signedAmount: -w.amount,
  }));
