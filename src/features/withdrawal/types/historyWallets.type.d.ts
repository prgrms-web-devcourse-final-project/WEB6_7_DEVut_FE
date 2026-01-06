interface WalletHistories {
  transactionDate: string;
  amount: number;
  transactionType: string;
  bizzBalanceAfter: number;
}

interface HistoryWalletsResponse {
  walletHistories: WalletHistories[];
  pageSize: number;
  totalPages: number;
  totalElements: number;
  currentPage: number;
}
