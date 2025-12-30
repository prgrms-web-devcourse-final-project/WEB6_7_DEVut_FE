interface BizzLogItem {
  id: string; // CHARGE-4, WITHDRAW-7
  kind: "CHARGE" | "WITHDRAW";
  label: "충전" | "출금";
  date: string; // ISO string
  amount: number; // 항상 양수
  signedAmount: number; // + / -
}
