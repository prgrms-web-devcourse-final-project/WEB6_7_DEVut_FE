"use client";

import QueryProvider from "./QueryProvider";
import { ProgressProvider } from "@bprogress/next/app";
import ToastProvider from "./ToastProvider";

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ProgressProvider
        height="4px"
        color="var(--color-custom-dark-brown)"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
        <ToastProvider />
      </ProgressProvider>
    </QueryProvider>
  );
}
