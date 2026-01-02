"use client";

import { useEffect } from "react";
import { stompClient } from "@/features/socket/stompClient";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    stompClient.activate();

    return () => {
      void stompClient.deactivate();
    };
  }, []);

  return <>{children}</>;
}
