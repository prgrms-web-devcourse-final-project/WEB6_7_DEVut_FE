"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDMSocketStore } from "@/features/socket/store/useDMSocketStore";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const setDMQueryClient = useDMSocketStore(state => state.setQueryClient);

  // 전역에서 queryClient에 접근할 수 있도록 window에 노출
  useEffect(() => {
    setDMQueryClient(queryClient);
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).queryClient = queryClient;
    }
  }, [setDMQueryClient]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
