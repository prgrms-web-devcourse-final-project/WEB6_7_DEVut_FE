export {};

declare global {
  interface Window {
    TossPayments: (clientKey: string) => {
      payment: (options: { customerKey?: string }) => {
        requestPayment: (params: TossPaymentRequest) => Promise<void>;
      };
    };
  }
}
